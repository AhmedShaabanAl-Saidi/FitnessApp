import { NgClass } from '@angular/common';
import { Component, ElementRef, input, output, signal, viewChild, AfterViewInit, effect } from '@angular/core';
import { TabItem } from './tabs.interface';
export type { TabItem } from './tabs.interface';

@Component({
  selector: 'app-tabs',
  imports: [NgClass],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class Tabs implements AfterViewInit {
  readonly tabs = input<TabItem[]>([]);
  readonly activeTabId = input<string>('');
  readonly tabChange = output<string>();

  private readonly scrollContainer = viewChild<ElementRef<HTMLDivElement>>('scrollContainer');

  readonly canScrollLeft = signal(false);
  readonly canScrollRight = signal(false);

  constructor() {
    effect(() => {
      this.tabs();
      setTimeout(() => this.checkScroll(), 50);
    });
  }

  ngAfterViewInit(): void {
    this.checkScroll();
  }

  checkScroll(): void {
    const el = this.scrollContainer()?.nativeElement;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const isRtl = getComputedStyle(el).direction === 'rtl';
    const current = Math.abs(scrollLeft);
    const max = scrollWidth - clientWidth;

    this.canScrollLeft.set(isRtl ? current < max - 5 : current > 5);
    this.canScrollRight.set(isRtl ? current > 5 : current < max - 5);
  }

  scroll(dir: 'left' | 'right'): void {
    const el = this.scrollContainer()?.nativeElement;
    if (!el) return;

    const isRtl = getComputedStyle(el).direction === 'rtl';
    const amount = (dir === 'right' ? 280 : -280) * (isRtl ? -1 : 1);

    el.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
