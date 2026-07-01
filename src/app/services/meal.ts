import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Meal } from '../healthy/models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private http = inject(HttpClient);

  private readonly baseUrl =
    'https://www.themealdb.com/api/json/v1/1';

  constructor() {}

  // جميع الوجبات
  getMeals(): Observable<{ meals: Meal[] }> {

    return this.http.get<{ meals: Meal[] }>(
      `${this.baseUrl}/filter.php?c=Seafood`
    );

  }

  // تفاصيل وجبة واحدة
  getMealById(id: string): Observable<{ meals: Meal[] }> {

    return this.http.get<{ meals: Meal[] }>(
      `${this.baseUrl}/lookup.php?i=${id}`
    );

  }

}
