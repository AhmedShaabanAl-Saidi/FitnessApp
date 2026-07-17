import { Injectable, inject, signal } from '@angular/core';
import { ChatService } from './chat-service';
import { ChatMessage, ChatConversation } from '../interfaces/chat.interface';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotStateService {
  private chatService = inject(ChatService);
  private activeSubscription: Subscription | null = null;

  // States
  isOpen = signal<boolean>(false);
  loading = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);
  messages = signal<ChatMessage[]>([]);
  conversations = signal<ChatConversation[]>([]);
  currentConversationId = signal<string>('');

  constructor() {
    this.loadConversationsFromStorage();
  }

  // Toggle chat panel open/close
  togglePanel() {
    if (this.isOpen()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel() {
    this.isOpen.set(true);

    // If current conversation is empty, start a new one
    if (this.messages().length === 0 && !this.currentConversationId()) {
      this.initNewConversation();
    } else if (this.messages().length === 0) {
      this.triggerWelcomeMessage();
    }
  }

  private triggerWelcomeMessage() {
    if (this.activeSubscription) {
      this.activeSubscription.unsubscribe();
    }

    this.loading.set(true);
    
    const welcomePrompt = "Introduce yourself as my Smart Coach. Greet me warmly, tell me what you can help with, and ask for my fitness or nutrition goals today. Keep it under three sentences.";
    
    const coachMsgId = `msg-${Date.now()}-welcome`;
    const coachMsgPlaceholder: ChatMessage = {
      id: coachMsgId,
      role: 'model',
      text: '',
      timestamp: new Date(),
    };
    this.messages.update((msgs) => [...msgs, coachMsgPlaceholder]);

    this.activeSubscription = this.chatService.sendMessage(welcomePrompt, []).subscribe({
      next: (cumulativeText) => {
        if (this.loading()) {
          this.loading.set(false);
        }
        this.messages.update((msgs) =>
          msgs.map((m) => (m.id === coachMsgId ? { ...m, text: cumulativeText } : m))
        );
      },
      complete: () => {
        this.loading.set(false);
        this.activeSubscription = null;
        this.saveCurrentConversation();
      },
      error: (err) => {
        console.warn('Failed to get Gemini greeting, falling back to static greeting:', err);
        this.loading.set(false);
        this.activeSubscription = null;
        this.messages.update((msgs) =>
          msgs.map((m) =>
            m.id === coachMsgId
              ? { ...m, text: this.getErrorMessage(err) }
              : m
          )
        );
        this.saveCurrentConversation();
      }
    });
  }

  closePanel() {
    this.isOpen.set(false);
    this.isMenuOpen.set(false);
    if (this.activeSubscription) {
      this.activeSubscription.unsubscribe();
      this.activeSubscription = null;
    }
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  // Initialize a new conversation session
  initNewConversation() {
    if (this.activeSubscription) {
      this.activeSubscription.unsubscribe();
      this.activeSubscription = null;
    }
    const id = `conv-${Date.now()}`;
    this.currentConversationId.set(id);
    this.messages.set([]);
    this.isMenuOpen.set(false);
    this.triggerWelcomeMessage();
  }

  sendMessage(text: string) {
    if (!text.trim()) return;

    if (this.activeSubscription) {
      this.activeSubscription.unsubscribe();
    }

    // Create user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    // Update message state
    this.messages.update((msgs) => [...msgs, userMsg]);
    this.loading.set(true);

    // Create placeholder for model's response
    const coachMsgId = `msg-${Date.now()}-model`;
    const coachMsgPlaceholder: ChatMessage = {
      id: coachMsgId,
      role: 'model',
      text: '',
      timestamp: new Date(),
    };
    this.messages.update((msgs) => [...msgs, coachMsgPlaceholder]);

    // Call service to get streaming AI response (slicing out the placeholder)
    this.activeSubscription = this.chatService.sendMessage(userMsg.text, this.messages().slice(0, -1)).subscribe({
      next: (cumulativeText) => {
        if (this.loading()) {
          this.loading.set(false);
        }
        this.messages.update((msgs) =>
          msgs.map((m) => (m.id === coachMsgId ? { ...m, text: cumulativeText } : m))
        );
      },
      complete: () => {
        this.loading.set(false);
        this.activeSubscription = null;
        this.saveCurrentConversation();
      },
      error: (err) => {
        console.error('State service message error:', err);
        this.loading.set(false);
        this.activeSubscription = null;
        this.messages.update((msgs) =>
          msgs.map((m) =>
            m.id === coachMsgId
              ? { ...m, text: this.getErrorMessage(err) }
              : m
          )
        );
        this.saveCurrentConversation();
      },
    });
  }

  // Load an existing conversation from list
  loadConversation(id: string) {
    if (this.activeSubscription) {
      this.activeSubscription.unsubscribe();
      this.activeSubscription = null;
    }
    const conv = this.conversations().find((c) => c.id === id);
    if (conv) {
      this.currentConversationId.set(conv.id);
      // Map stored timestamp strings back to Date objects if necessary
      const mappedMessages = conv.messages.map((m) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      }));
      this.messages.set(mappedMessages);
    }
    this.isMenuOpen.set(false);
  }

  // Delete a conversation
  deleteConversation(id: string, event: Event) {
    event.stopPropagation();
    this.conversations.update((convs) => convs.filter((c) => c.id !== id));
    this.saveConversationsToStorage();
    if (this.currentConversationId() === id) {
      this.initNewConversation();
    }
  }

  // Save current messages to the conversations history list and local storage
  private saveCurrentConversation() {
    const currentId = this.currentConversationId();
    if (!currentId || this.messages().length === 0) return;

    // Use first user message or a snippet as title, fallback to "Workout Plan Details..."
    const firstUserMsg = this.messages().find((m) => m.role === 'user');
    const title = firstUserMsg
      ? firstUserMsg.text.length > 25
        ? firstUserMsg.text.substring(0, 25) + '...'
        : firstUserMsg.text
      : 'Smart Coach Session';

    const updatedConversation: ChatConversation = {
      id: currentId,
      title,
      messages: this.messages(),
      timestamp: new Date(),
    };

    this.conversations.update((convs) => {
      const index = convs.findIndex((c) => c.id === currentId);
      if (index > -1) {
        const copy = [...convs];
        copy[index] = updatedConversation;
        return copy.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      } else {
        return [updatedConversation, ...convs];
      }
    });

    this.saveConversationsToStorage();
  }

  private saveConversationsToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('smart_coach_conversations', JSON.stringify(this.conversations()));
    }
  }

  private loadConversationsFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('smart_coach_conversations');
        if (saved) {
          const list = JSON.parse(saved) as ChatConversation[];
          // Parse date strings
          const parsed = list.map((c) => ({
            ...c,
            timestamp: new Date(c.timestamp),
          }));
          this.conversations.set(parsed);
        }
      } catch (e) {
        console.error('Error loading conversations from localStorage:', e);
      }
    }
  }

  private getErrorMessage(err: any): string {
    const message = err?.message || '';

    if (message.includes('429')) {
      return 'Smart Coach is temporarily rate-limited. Please wait a moment and try again.';
    }
    if (message.includes('503')) {
      return 'Smart Coach is experiencing high demand right now. Please try again in a few seconds.';
    }
    if (message.includes('not configured')) {
      return 'API key is not configured. Please set your Gemini API key in the browser console: localStorage.setItem(\'gemini_api_key\', \'YOUR_KEY\')';
    }
    if (message.includes('404')) {
      return 'The AI model is currently unavailable. Please try again later.';
    }
    return 'Unable to reach Smart Coach right now. Please check your connection and try again.';
  }
}
