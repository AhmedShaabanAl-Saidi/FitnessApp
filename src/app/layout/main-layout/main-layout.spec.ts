import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayout } from './main-layout';
import { provideRouter } from '@angular/router';
import { ChatService } from '../../features/chatbot/services/chat-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach } from 'vitest';

const chatServiceStub: ChatService = {
  sendMessage: () => of('Hello!'),
};

describe('MainLayout', () => {
  let component: MainLayout;
  let fixture: ComponentFixture<MainLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ChatService, useValue: chatServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
