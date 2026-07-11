import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Carousel } from '../carousel/carousel';
import { TabItem, Tabs } from '../tabs/tabs';
import { MuscleAPIResponse, MuscleGroup } from '../../interfaces/muscles';
import { MuscleService } from '../../services/muscle-service';
import { MarqueeTricker } from '../marquee-tricker/marquee-tricker';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-workouts',
  imports: [Carousel, Tabs, MarqueeTricker, TranslatePipe],
  templateUrl: './workouts.html',
  styleUrl: './workouts.css',
})
export class Workouts implements OnInit {
  navigaetTo($event: string) {
    console.log('navigate to', $event);
    this.router.navigate(['/classes', $event]);
  }
  rows = input<1 | 2>(1);
  showMarquee = input<boolean>(false);
  muscleGroups = signal<MuscleGroup[]>([]);
  private readonly service = inject(MuscleService);
  private readonly translate = inject(TranslateService);
  selectedTab = signal<string>('full-body');
  content = signal<MuscleAPIResponse | null>(null);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  tabs = computed<TabItem[]>(() => [
    { id: 'full-body', label: this.translate.instant('WORKOUTS.FULL_BODY') },
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
