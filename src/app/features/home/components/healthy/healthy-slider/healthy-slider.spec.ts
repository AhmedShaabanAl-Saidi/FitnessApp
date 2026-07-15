import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthySlider } from './healthy-slider';

describe('HealthySlider', () => {
  let component: HealthySlider;
  let fixture: ComponentFixture<HealthySlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthySlider],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthySlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
