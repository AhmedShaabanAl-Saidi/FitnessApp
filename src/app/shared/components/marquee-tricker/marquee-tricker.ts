import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-marquee-tricker',
  imports: [],
  templateUrl: './marquee-tricker.html',
  styleUrl: './marquee-tricker.css',
})
export class MarqueeTricker {
  items = signal<string[]>([
    'Personal Trainers',
    'Live Classes',
    'Outdoor & Online Trainers',
    'Personal Training',
  ]);
}
