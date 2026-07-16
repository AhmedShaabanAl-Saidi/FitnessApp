import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  title = input.required<string>();
  image = input<string | null>(null);
  fallbackImage = input<string>('/images/home/workouts-bg.jpg');
  actionLabel = input<string>('Explore');
}
