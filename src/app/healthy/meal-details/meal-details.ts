import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
  DestroyRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MealService } from '../../services/meal';
import { Meal } from '../models/meal.model';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css'
})
export class MealDetailsComponent implements OnChanges {

  private mealService = inject(MealService);
  private destroyRef = inject(DestroyRef);

  @Input({ required: true })
  mealId!: string | null;

  mealData = signal<Meal | null>(null);

  loading = signal<boolean>(false);

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['mealId'] &&
      this.mealId
    ) {
      this.loadMeal(this.mealId);
    }

  }

  private loadMeal(id: string): void {

    this.loading.set(true);

    this.mealService
      .getMealById(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({

        next: (response) => {

          this.mealData.set(
            response.meals?.[0] ?? null
          );

          this.loading.set(false);

        },

        error: (error) => {

          console.error(error);

          this.loading.set(false);

        }

      });

  }

  getIngredients(): {

    ingredient: string;

    measure: string;

  }[] {

    const meal = this.mealData();

    if (!meal) {

      return [];

    }

    const ingredients: {

      ingredient: string;

      measure: string;

    }[] = [];

    for (let i = 1; i <= 20; i++) {

      const ingredient = meal[`strIngredient${i}`];

      const measure = meal[`strMeasure${i}`];

      if (

        ingredient &&
        ingredient.trim() !== ''

      ) {

        ingredients.push({

          ingredient,

          measure

        });

      }

    }

    return ingredients;

  }

}
