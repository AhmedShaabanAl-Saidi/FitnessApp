import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { inject, Service, signal } from '@angular/core';
import {
  MuscleAPIResponse,
  MuscleGroupByIdResponse,
  MuscleGroupResponse,
  MealAPIResponse,
  DifficultyLevelsResponse,
  ExercisesByMuscleAndDifficultyResponse,
} from '../interfaces/muscles';
import { Observable, of, forkJoin, map, switchMap } from 'rxjs';

@Service()
export class MuscleService {
  private readonly baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  getMuscleGroups(): Observable<MuscleGroupResponse> {
    return this.httpClient.get<MuscleGroupResponse>(`${this.baseUrl}muscles`);
  }
  getMuscleFullBody(): Observable<MuscleAPIResponse> {
    return this.httpClient.get<MuscleAPIResponse>(`${this.baseUrl}muscles/random`);
  }
  getMuscleById(id: string): Observable<MuscleGroupByIdResponse> {
    return this.httpClient.get<MuscleGroupByIdResponse>(`${this.baseUrl}musclesGroup/${id}`);
  }
  getDifficultyLevelsForMuscle(muscleId: string): Observable<DifficultyLevelsResponse> {
    return this.httpClient.get<DifficultyLevelsResponse>(
      `${this.baseUrl}levels/difficulty-levels/by-prime-mover?primeMoverMuscleId=${muscleId}`,
    );
  }
  getExercisesByMuscleAndDifficulty(
    muscleId: string,
    difficultyId: string,
  ): Observable<ExercisesByMuscleAndDifficultyResponse> {
    return this.httpClient.get<ExercisesByMuscleAndDifficultyResponse>(
      `${this.baseUrl}exercises/by-muscle-difficulty?primeMoverMuscleId=${muscleId}&difficultyLevelId=${difficultyId}`,
    );
  }
  getMealSefoad(): Observable<MealAPIResponse> {
    return this.httpClient.get<MealAPIResponse>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`,
    );
  }
}
