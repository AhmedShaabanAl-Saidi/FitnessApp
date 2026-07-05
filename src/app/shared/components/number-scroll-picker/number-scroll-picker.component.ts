import { Component, ElementRef, ViewChild, model, input, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number-scroll-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-scroll-picker.component.html',
  styleUrl: './number-scroll-picker.component.css'
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
