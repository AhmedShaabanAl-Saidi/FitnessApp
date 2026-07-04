import { Component, ElementRef, HostListener, Input, ViewChild, model, input, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number-scroll-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full flex flex-col items-center select-none my-8 relative">
      <!-- Unit Indicator (e.g. Kg, CM, Years) -->
      @if (unit()) {
        <span class="text-xs font-semibold text-[#FF5E00] uppercase mb-4">{{ unit() }}</span>
      }

      <!-- Scroll Wrapper -->
      <div 
        #scrollContainer
        (scroll)="onScroll()"
        class="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none relative py-4"
        style="-ms-overflow-style: none; scrollbar-width: none;"
      >
        <!-- Start Spacer to allow first element to center -->
        <div class="flex-shrink-0 w-[calc(50%-28px)]"></div>

        <!-- Numbers List -->
        @for (num of numbers(); track num) {
          <div
            (click)="scrollToValue(num)"
            class="flex-shrink-0 w-14 h-14 flex items-center justify-center snap-center cursor-pointer transition-all duration-300"
            [ngClass]="{
              'text-[#FF5E00] text-3xl font-black scale-125': value() === num,
              'text-white text-xl font-bold opacity-60': value() !== num && Math.abs(value() - num) === 1,
              'text-white text-sm font-semibold opacity-30': value() !== num && Math.abs(value() - num) > 1
            }"
          >
            {{ num }}
          </div>
        }

        <!-- End Spacer to allow last element to center -->
        <div class="flex-shrink-0 w-[calc(50%-28px)]"></div>
      </div>

      <!-- Arrow Indicator -->
      <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#FF5E00] mt-2"></div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
  `]
})
export class NumberScrollPickerComponent {
  min = input<number>(10);
  max = input<number>(150);
  step = input<number>(1);
  unit = input<string>('');
  value = model<number>(25);

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  readonly Math = Math;

  numbers = computed(() => {
    const list = [];
    for (let i = this.min(); i <= this.max(); i += this.step()) {
      list.push(i);
    }
    return list;
  });

  constructor() {
    // Scroll to the initial value when it changes externally or is initialized
    effect(() => {
      const val = this.value();
      // Use setTimeout to ensure the view is initialized and layout is complete
      setTimeout(() => {
        this.centerValue(val);
      }, 50);
    });
  }

  onScroll() {
    if (!this.scrollContainer) return;
    const container = this.scrollContainer.nativeElement;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 56; // 14 * 4px = 56px (w-14)
    const index = Math.round(scrollLeft / itemWidth);
    const newValue = this.min() + index * this.step();
    
    if (newValue >= this.min() && newValue <= this.max() && newValue !== this.value()) {
      this.value.set(newValue);
    }
  }

  scrollToValue(val: number) {
    this.value.set(val);
    this.centerValue(val);
  }

  private centerValue(val: number) {
    if (!this.scrollContainer) return;
    const container = this.scrollContainer.nativeElement;
    const index = (val - this.min()) / this.step();
    const itemWidth = 56;
    const targetScroll = index * itemWidth;
    
    if (Math.abs(container.scrollLeft - targetScroll) > 2) {
      container.scrollLeft = targetScroll;
    }
  }
}
