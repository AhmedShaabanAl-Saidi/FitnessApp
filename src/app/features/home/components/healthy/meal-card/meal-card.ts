import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MealCard } from '../models/meal-card';


@Component({
  selector: 'app-meal-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meal-card.html',
  styleUrl: './meal-card.css',
})
export class MealCardComponent {

  @Input({ required: true })
  meal!: MealCard;

  @Output()
  recipeClick = new EventEmitter<string>();

  openRecipe(): void {
    this.recipeClick.emit(this.meal.idMeal);
  }

}
