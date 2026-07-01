import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meal } from '../models/meal.model';

@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal.html',
  styleUrl: './meal.css'
})
export class MealCardComponent {

  @Input({ required: true })
  meal!: Meal;

  @Output()
  recipeClick = new EventEmitter<string>();

  openRecipe() {
    this.recipeClick.emit(this.meal.idMeal);
  }

}
