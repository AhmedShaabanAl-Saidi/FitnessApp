import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeTricker } from './marquee-tricker';

describe('MarqueeTricker', () => {
  let component: MarqueeTricker;
  let fixture: ComponentFixture<MarqueeTricker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueeTricker],
    }).compileComponents();

    fixture = TestBed.createComponent(MarqueeTricker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
