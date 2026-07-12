import { Component, ElementRef, ViewChild, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotStateService } from '../../services/chatbot-state.service';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, Tooltip],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class ChatbotComponent {


  state = inject(ChatbotStateService);
  
  // Local UI states
  messageText = signal<string>('');

  @ViewChild('chatScrollContainer') private chatScrollContainer!: ElementRef;

  constructor() {
    // Automatically scroll to bottom when messages list updates or loading state changes
    effect(() => {
      this.state.messages();
      this.state.loading();
      this.scrollToBottom();
    });
  }

  // Scroll messages viewport to the bottom
  scrollToBottom(): void {
    setTimeout(() => {
      try {
        if (this.chatScrollContainer && this.chatScrollContainer.nativeElement) {
          const container = this.chatScrollContainer.nativeElement;
          if (typeof container.scrollTo === 'function') {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'auto',
            });
          } else {
            container.scrollTop = container.scrollHeight;
          }
        }
      } catch (err) {
        console.warn('Scroll to bottom failed:', err);
      }
    }, 100);
  }


  // Submit message
  onSubmit() {
    const text = this.messageText().trim();
    if (!text) return;
    
    this.state.sendMessage(text);
    this.messageText.set(''); // Clear input
  }

  // Handle Enter keypress in input box
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}
