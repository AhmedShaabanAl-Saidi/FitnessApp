import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { HealthyService } from '../services/healthy-service';
import { HealthyMealDetails } from '../interfaces/healthy';

@Component({
  selector: 'app-healthy-details',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './healthy-details.html',
  styleUrl: './healthy-details.css',
})
export class HealthyDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(HealthyService);
  private readonly destroyRef = inject(DestroyRef);

  meal = signal<HealthyMealDetails | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ingredients = computed(() => {
    const m = this.meal();
    if (!m) return [];
    const pairs: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = (m as never)[`strIngredient${i}`] as string;
      const measure = (m as never)[`strMeasure${i}`] as string;
      if (ingredient?.trim()) {
        pairs.push({ ingredient: ingredient.trim(), measure: measure?.trim() ?? '' });
      }
    }
    return pairs;
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((id) => {
        if (!id) {
          this.error.set('Missing meal id.');
          this.loading.set(false);
          return;
        }
        this.loadMealDetails(id);
      });
  }

  goBack(): void {
    this.router.navigate(['/healthy']);
  }

  private loadMealDetails(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.service
      .getMealDetails(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          const details = res.meals?.[0] ?? null;
          this.meal.set(details);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load meal details.');
          this.loading.set(false);
        },
      });
  }
}
