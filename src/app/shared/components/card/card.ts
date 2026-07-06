import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  title = input.required<string>();
  image = input<string | null>(null);
  fallbackImage = input<string>('/images/home/workouts-bg.jpg');
  actionLabel = input<string>('Explore');
}
