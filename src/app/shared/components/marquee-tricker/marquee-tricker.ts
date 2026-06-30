import { Component, input } from '@angular/core';

@Component({
  selector: 'app-marquee-tricker',
  imports: [],
  templateUrl: './marquee-tricker.html',
  styleUrl: './marquee-tricker.css',
})
export class MarqueeTricker {
  items = input.required<string[]>();
}
