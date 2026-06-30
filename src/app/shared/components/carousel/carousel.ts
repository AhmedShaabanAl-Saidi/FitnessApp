import { Component, CUSTOM_ELEMENTS_SCHEMA, computed, input } from '@angular/core';
import { Card } from '../card/card';

export interface CarouselItem {
  id: string;
  title: string;
  image: string | null;
}

@Component({
  selector: 'app-carousel',
  imports: [Card],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Carousel {
  items = input<CarouselItem[]>([]);
  rows = input<1 | 2>(1);
  fallbackImage = input<string>('/images/home/workouts-bg.jpg');

  breakpoints = computed(() => ({
    0: { slidesPerView: 1, grid: { rows: 1 } },
    640: { slidesPerView: 2, grid: { rows: 1 } },
    1024: { slidesPerView: 3, grid: { rows: this.rows(), fill: 'row' } },
  }));
}
