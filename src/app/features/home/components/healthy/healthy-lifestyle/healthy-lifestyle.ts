import {
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealService } from '../services/meal';
import { Category } from '../models/category.model';
import { MealCard } from '../models/meal-card';
import { HealthySliderComponent } from '../healthy-slider/healthy-slider';
import { MealDetailsComponent } from '../meal-details/meal-details';
import { HealthyHeader } from "../healthy-header/healthy-header";



@Component({
  selector: 'app-healthy-lifestyle',
  standalone: true,
  imports: [
    CommonModule,
    HealthySliderComponent,
    MealDetailsComponent,
    HealthyHeader
],
  templateUrl: './healthy-lifestyle.html',
  styleUrl: './healthy-lifestyle.css',
})
export class HealthyLifestyleComponent implements OnInit {

  private readonly mealService = inject(MealService);

  readonly categories = signal<Category[]>([]);

  readonly meals = signal<MealCard[]>([]);

  readonly selectedCategory = signal('Seafood');

  readonly selectedMealId = signal<string | null>(null);

  ngOnInit(): void {

    this.loadCategories();

    this.loadMeals(this.selectedCategory());

  }

  loadCategories(): void {

    this.mealService.getCategories().subscribe({

      next: ({ categories }) => {

        this.categories.set(categories);

      },

      error: console.error,

    });

  }

  loadMeals(category: string): void {

    this.mealService.getMeals(category).subscribe({

      next: ({ meals }) => {

        this.meals.set(meals.slice(0, 15));

      },

      error: console.error,

    });

  }

  changeCategory(category: string): void {

    this.selectedCategory.set(category);

    this.loadMeals(category);

  }

  openRecipe(id: string): void {

    this.selectedMealId.set(id);

  }

  closeRecipe(): void {

    this.selectedMealId.set(null);

  }

}
