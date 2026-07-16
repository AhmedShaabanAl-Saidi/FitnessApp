import { Component, CUSTOM_ELEMENTS_SCHEMA, computed, inject, input, output } from '@angular/core';
import { languageService } from '../../../core/services/language-service';
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
  private readonly langService = inject(languageService);

  items = input<CarouselItem[]>([]);
  rows = input<1 | 2>(1);
  navigateTo = output<string>();
  onNavigateTo(id: string) {
    this.navigateTo.emit(id);
  }
  fallbackImage = input<string>('/images/home/workouts-bg.jpg');

  direction = computed(() => (this.langService.isRTL() ? 'rtl' : 'ltr'));

  breakpoints = computed(() => ({
    0: { slidesPerView: 1, grid: { rows: 1 } },
    640: { slidesPerView: 2, grid: { rows: 1 } },
    1024: { slidesPerView: 3, grid: { rows: this.rows(), fill: 'row' } },
  }));
}
