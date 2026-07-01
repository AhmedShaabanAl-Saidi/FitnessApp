import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Meal } from '../models/meal.model';
import { MealCardComponent } from '../meal-card/meal';

@Component({
  selector: 'app-healthy-slider',
  standalone: true,
  imports: [
    CommonModule,
    MealCardComponent
],
  templateUrl: './healthy-slider.html',
  styleUrl: './healthy-slider.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HealthySliderComponent {

  @Input({ required: true })
  meals: Meal[] = [];

  @Output()
  recipeClick = new EventEmitter<string>();

  openRecipe(id: string) {
    this.recipeClick.emit(id);
  }

}
