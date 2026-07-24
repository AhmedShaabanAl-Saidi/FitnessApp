import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import {
  HealthyCategories,
  HealthyMealDetails,
  HealthyMeals,
  HealthyMealsDetails,
} from '../interfaces/healthy';
import { Observable } from 'rxjs';

@Service()
export class HealthyService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'https://www.themealdb.com/api/json/v1/1';

  getCategories(): Observable<HealthyCategories> {
    return this.httpClient.get<HealthyCategories>(this.url + '/categories.php');
  }

  getMealsByCategory(category: string): Observable<HealthyMeals> {
    return this.httpClient.get<HealthyMeals>(this.url + '/filter.php?c=' + category);
  }

  getMealDetails(id: string): Observable<HealthyMealsDetails> {
    return this.httpClient.get<HealthyMealsDetails>(this.url + '/lookup.php?i=' + id);
  }
}
