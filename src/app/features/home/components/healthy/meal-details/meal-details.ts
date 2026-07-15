import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';


import {
  MealDetails,
} from '../models/meal-details.model';
import { MealService } from '../services/meal';

@Component({
  selector: 'app-meal-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-details.html',
  styleUrl: './meal-details.css',
})
export class MealDetailsComponent implements OnChanges {

  private readonly mealService = inject(MealService);

  @Input({ required: true })
  mealId!: string;

  readonly meal = signal<MealDetails | null>(null);

  readonly loading = signal(true);

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['mealId']) {

      this.getMeal();

    }

  }

  private getMeal(): void {

    this.loading.set(true);

    this.mealService.getMealById(this.mealId).subscribe({

      next: ({ meals }) => {

        this.meal.set(meals[0]);

        this.loading.set(false);

      },

      error: () => {

        this.loading.set(false);

      },

    });

  }

  get ingredients(): string[] {

    const meal = this.meal();

    if (!meal) return [];

    const list: string[] = [];

    for (let i = 1; i <= 20; i++) {

      const ingredient =
        meal[`strIngredient${i}` as keyof MealDetails] as string;

      const measure =
        meal[`strMeasure${i}` as keyof MealDetails] as string;

      if (ingredient?.trim()) {

        list.push(`${measure ?? ''} ${ingredient}`);

      }

    }

    return list;

  }

}
