import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-message-card',
  standalone: true,
  imports: [CommonModule, Tooltip],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.css',
})
export class MessageCardComponent {
  @Input({ required: true }) role!: 'user' | 'model';
  @Input({ required: true }) text!: string;
  @Input({ required: true }) timestamp!: Date | string | number;
}
