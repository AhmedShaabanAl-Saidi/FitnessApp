import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Carousel, CarouselItem } from '../carousel/carousel';
import { TabItem, Tabs } from '../tabs/tabs';
import { MarqueeTricker } from '../marquee-tricker/marquee-tricker';
import { HealthyService } from '../../../features/healthy/services/healthy-service';
import { Category } from '../../../features/healthy/interfaces/healthy';

@Component({
  selector: 'app-healthy-section',
  imports: [Carousel, Tabs, MarqueeTricker, TranslatePipe],
  templateUrl: './healthy-section.html',
  styleUrl: './healthy-section.css',
})
export class HealthySection implements OnInit {
  rows = input<1 | 2>(1);
  showMarquee = input<boolean>(false);

  private readonly service = inject(HealthyService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);

  categories = signal<Category[]>([]);
  selectedTab = signal<string>('');
  meals = signal<CarouselItem[]>([]);
  loading = signal(true);
  mealsLoading = signal(false);

  tabs = computed<TabItem[]>(() =>
    this.categories().map((cat) => ({ id: cat.strCategory, label: cat.strCategory })),
  );

  exploreLabel = computed(() => this.translate.instant('HEALTHY.EXPLORE'));

  ngOnInit(): void {
    this.service
      .getCategories()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          const cats = res.categories ?? [];
          this.categories.set(cats);
          this.loading.set(false);
          if (cats.length > 0) {
            this.clickTab(cats[0].strCategory);
          }
        },
        error: () => this.loading.set(false),
      });
  }

  clickTab(category: string): void {
    this.selectedTab.set(category);
    this.mealsLoading.set(true);
    this.service
      .getMealsByCategory(category)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          const maxItems = this.rows() * 9;
          this.meals.set(
            (res.meals ?? []).slice(0, maxItems).map((m) => ({
              id: m.idMeal,
              title: m.strMeal,
              image: m.strMealThumb,
            })),
          );
          this.mealsLoading.set(false);
        },
        error: () => {
          this.meals.set([]);
          this.mealsLoading.set(false);
        },
      });
  }

  navigateTo(id: string): void {
    this.router.navigate(['/healthy', id]);
  }
}
