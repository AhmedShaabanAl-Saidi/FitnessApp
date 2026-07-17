import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chatbot';
import { ChatService } from '../../services/chat-service';
import { ChatbotStateService } from '../../services/chatbot-state.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach } from 'vitest';

const chatServiceStub: ChatService = {
  sendMessage: () => of('Hello! I am your Smart Coach.'),
};

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;
  let stateService: ChatbotStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbotComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ChatService, useValue: chatServiceStub },
        ChatbotStateService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    stateService = TestBed.inject(ChatbotStateService);

    // Clear session storage to ensure clean state triggers for test
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      localStorage.clear();
    }

    await fixture.whenStable();
  });

  it('should create the chatbot component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with chat panel closed by default', () => {
    expect(stateService.isOpen()).toBe(false);
  });

  it('should open the panel and trigger welcome greeting', async () => {
    stateService.openPanel();
    expect(stateService.isOpen()).toBe(true);

    await fixture.whenStable();

    expect(stateService.messages().length).toBe(1);
    expect(stateService.messages()[0].text).toContain('Hello! I am your Smart Coach');
    expect(stateService.loading()).toBe(false);
  });

  it('should clear messageText input field after submitting', () => {
    component.messageText.set('Plan a workout split');
    component.onSubmit();

    expect(component.messageText()).toBe('');
  });
});
