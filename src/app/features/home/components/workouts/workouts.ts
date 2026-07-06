import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Carousel } from '../../../../shared/components/carousel/carousel';
import { TabItem, Tabs } from '../../../../shared/components/tabs/tabs';
import { MuscleAPIResponse, MuscleGroup } from '../../../../shared/interfaces/muscles';
import { MuscleService } from '../../../../shared/services/muscle-service';
@Component({
  selector: 'app-workouts',
  imports: [Carousel, Tabs],
  templateUrl: './workouts.html',
  styleUrl: './workouts.css',
})
export class Workouts implements OnInit {
  muscleGroups = signal<MuscleGroup[]>([]);
  private readonly service = inject(MuscleService);
  selectedTab = signal<string>('full-body');
  content = signal<MuscleAPIResponse | null>(null);
  private readonly _destroyRef = inject(DestroyRef);

  tabs = computed<TabItem[]>(() => [
    { id: 'full-body', label: 'Full Body' },
    ...this.muscleGroups().map((group) => ({ id: group._id, label: group.name })),
  ]);

  carouselItems = computed(() =>
    (this.content()?.muscles ?? []).map((muscle) => ({
      id: muscle._id,
      title: muscle.name,
      image: muscle.image,
    })),
  );
  private loadInitialMuscleGroups(): void {
    this.service
      .getMuscleGroups()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          if (res?.musclesGroup) {
            this.muscleGroups.set([...res.musclesGroup]);
          }
        },
      });
  }
  ngOnInit() {
    this.loadInitialMuscleGroups();
    this.clickTab('full-body');
  }

  clickTab(id: string) {
    this.selectedTab.set(id);

    const request$ =
      id === 'full-body'
        ? this.service.getMuscleFullBody()
        : this.service.getMuscleById(id).pipe(
            map((res) => ({
              message: res.message,
              totalMuscles: res.muscles.length,
              muscles: res.muscles,
            })),
          );
    request$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: (content) => this.content.set(content),
      error: (err) => console.error(err),
    });
  }
}
