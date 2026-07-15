import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MealDetailsResponse,
} from '../models/meal-details.model';
import { CategoryResponse } from '../models/category.model';
import { MealCardResponse } from '../models/meal-card';

@Injectable({
  providedIn: 'root',
})
export class MealService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    'https://www.themealdb.com/api/json/v1/1';

  getCategories(): Observable<CategoryResponse> {

    return this.http.get<CategoryResponse>(
      `${this.baseUrl}/categories.php`
    );

  }

 
  getMeals(category: string): Observable<MealCardResponse> {

    return this.http.get<MealCardResponse>(
      `${this.baseUrl}/filter.php?c=${category}`
    );

  }


  getMealById(id: string): Observable<MealDetailsResponse> {

    return this.http.get<MealDetailsResponse>(
      `${this.baseUrl}/lookup.php?i=${id}`
    );

  }

}
