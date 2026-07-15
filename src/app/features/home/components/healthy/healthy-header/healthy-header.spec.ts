import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyHeader } from './healthy-header';

describe('HealthyHeader', () => {
  let component: HealthyHeader;
  let fixture: ComponentFixture<HealthyHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthyHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
