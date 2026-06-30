import { Component, DestroyRef, computed, inject, OnInit, signal } from '@angular/core';
import { MuscleAPIResponse, MuscleGroup } from '../../../../shared/interfaces/muscles';
import { MuscleService } from '../../../../shared/services/muscle-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Carousel } from '../../../../shared/components/carousel/carousel';
import { TabItem, Tabs } from '../../../../shared/components/tabs/tabs';
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

  ngOnInit() {
    this.service
      .getMuscleGroups()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          if (res && res.musclesGroup) {
            this.muscleGroups.set([...res.musclesGroup]);
          }
        },
      });
    this.clickTab('full-body');
  }

  clickTab(id: string) {
    this.selectedTab.set(id);
    if (id === 'full-body') {
      this.service
        .getMuscleFullBody()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            if (res) this.content.set(res);
          },
        });
    } else {
      this.service
        .getMuscleById(id)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (res) => {
            if (res) {
              this.content.set({
                message: res.message,
                totalMuscles: res.muscles.length,
                muscles: res.muscles,
              });
            }
          },
        });
    }
  }
}
