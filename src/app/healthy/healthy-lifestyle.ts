import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MealService } from '../services/meal';
import { Meal } from '../healthy/models/meal.model';

import { HealthyHeader } from './healthy-header/healthy-header';
import {  HealthySliderComponent } from './healthy-slider/healthy-slider';
import { MealDetailsComponent } from './meal-details/meal-details';

@Component({
  selector: 'app-healthy-lifestyle',
  standalone: true,
  imports: [
    CommonModule,
    HealthyHeader,
    MealDetailsComponent,
    HealthySliderComponent
],
  templateUrl: './healthy-lifestyle.html',
  styleUrl: './healthy-lifestyle.css'
})
export class HealthyLifestyle implements OnInit {

  private mealService = inject(MealService);

  meals = signal<Meal[]>([]);

  selectedMealId = signal<string | null>(null);

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals(): void {

    this.mealService.getMeals().subscribe({

      next: (response) => {

        if (response.meals) {

          this.meals.set(response.meals);

        }

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  openRecipe(id: string): void {

    this.selectedMealId.set(id);

  }

  closeRecipe(): void {

    this.selectedMealId.set(null);

  }

}
