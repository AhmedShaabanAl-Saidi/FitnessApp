export interface MealCard {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string | null;
  strCountry: string | null;
}

export interface MealCardResponse {
  meals: MealCard[];
}
