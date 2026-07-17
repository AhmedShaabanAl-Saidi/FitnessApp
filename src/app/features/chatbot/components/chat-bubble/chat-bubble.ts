import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMessage } from '../../interfaces/chat.interface';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bubble.html',
  styles: [],
})
export class ChatBubbleComponent {
  @Input({ required: true }) message!: ChatMessage;
}
