import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsSummary } from './about-us-summary';

describe('AboutUs', () => {
  let component: AboutUsSummary;
  let fixture: ComponentFixture<AboutUsSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUsSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
