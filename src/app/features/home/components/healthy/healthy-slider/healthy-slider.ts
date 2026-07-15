import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { MealCardComponent } from '../meal-card/meal-card';
import { MealCard } from '../models/meal-card';

@Component({
  selector: 'app-healthy-slider',
  standalone: true,
  imports: [CommonModule, MealCardComponent],
  templateUrl: './healthy-slider.html',
  styleUrl: './healthy-slider.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HealthySliderComponent implements AfterViewInit {

  @ViewChild('swiper')
  swiper!: ElementRef;

  @Input({ required: true })
  meals: MealCard[] = [];

  @Output()
  recipeClick = new EventEmitter<string>();

  openRecipe(id: string) {
    this.recipeClick.emit(id);
  }

  ngAfterViewInit(): void {

    const swiperEl = this.swiper.nativeElement;

    Object.assign(swiperEl, {

      slidesPerView: 3,

      spaceBetween: 30,

      navigation: true,

      pagination: {
        clickable: true,
      },

      loop: true,

      breakpoints: {

        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },

        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },

      },

    });

    swiperEl.initialize();

  }

}
