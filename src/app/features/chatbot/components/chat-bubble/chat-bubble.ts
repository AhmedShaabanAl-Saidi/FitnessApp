import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Avatar } from 'primeng/avatar';
import { ChatMessage } from '../../interfaces/chat.interface';
import { MessageCardComponent } from './message-card.component';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule, Avatar, MessageCardComponent],
  templateUrl: './chat-bubble.html',
  styles: [],
})
export class ChatBubbleComponent {
  @Input({ required: true }) message!: ChatMessage;
}
