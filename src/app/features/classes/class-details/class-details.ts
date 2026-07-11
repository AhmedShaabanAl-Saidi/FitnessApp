import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Tabs, TabItem } from '../../../shared/components/tabs/tabs';
import { DifficultyLevel, Exercise, Meal } from '../../../shared/interfaces/muscles';
import { MuscleService } from '../../../shared/services/muscle-service';
import { Card } from '../../../shared/components/card/card';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [RouterLink, Tabs, Card, TranslatePipe],
  templateUrl: './class-details.html',
})
export class ClassDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(MuscleService);
  private readonly destroyRef = inject(DestroyRef);

  private classId = '';
  difficultyLevels = signal<DifficultyLevel[]>([]);
  exercises = signal<Exercise[]>([]);
  meals = signal<Meal[]>([]);
  loading = signal(true);
  loadingExercises = signal(false);
  error = signal<string | null>(null);
  selectedDifficultyId = signal('');

  selectedExercise = signal<Exercise | null>(null);

  difficultyTabs = computed<TabItem[]>(() =>
    this.difficultyLevels().map((level) => ({
      id: level.id,
      label: level.name,
    })),
  );

  selectedDifficultyName = computed(
    () =>
      this.difficultyLevels().find((level) => level.id === this.selectedDifficultyId())?.name ?? '',
  );

  visibleMeals = computed(() => this.meals().slice(0, 3));

  ngOnInit(): void {
    this.loadClassIdFromRoute();
    this.loadMeals();
  }

  onDifficultyChange(id: string): void {
    this.selectedDifficultyId.set(id);
    if (!this.classId) return;
    this.loadExercises(this.classId, id);
  }

  onExerciseSelect(exercise: Exercise): void {
    this.selectedExercise.set(exercise);
  }

  watchVideo(event: Event, videoLink: string | undefined): void {
    event.stopPropagation();
    if (videoLink) {
      window.open(videoLink, '_blank', 'noreferrer');
    }
  }
  private loadClassIdFromRoute(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((id) => {
        if (!id) {
          this.error.set('Missing class id.');
          this.loading.set(false);
          return;
        }

        this.classId = id;
        this.loadClassDetails(id);
      });
  }
  private loadClassDetails(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.exercises.set([]);

    this.service
      .getDifficultyLevelsForMuscle(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (levels) => {
          this.difficultyLevels.set(levels.difficulty_levels ?? []);
          const firstLevelId = levels.difficulty_levels?.[0]?.id ?? '';
          this.selectedDifficultyId.set(firstLevelId);

          if (firstLevelId) {
            this.loadExercises(id, firstLevelId);
          }
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load this class right now.');
          this.loading.set(false);
        },
      });
  }

  private loadExercises(classId: string, difficultyId: string): void {
    this.loadingExercises.set(true);

    this.service
      .getExercisesByMuscleAndDifficulty(classId, difficultyId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const list = response.exercises ?? [];
          this.exercises.set(list);
          this.selectedExercise.set(list.length > 0 ? list[0] : null);
          this.loadingExercises.set(false);
        },
        error: () => {
          this.exercises.set([]);
          this.selectedExercise.set(null);
          this.loadingExercises.set(false);
        },
      });
  }

  private loadMeals(): void {
    this.service
      .getMealSefoad()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.meals.set((response.meals ?? []).slice(0, 3));
        },
        error: () => {
          this.meals.set([]);
        },
      });
  }
}
