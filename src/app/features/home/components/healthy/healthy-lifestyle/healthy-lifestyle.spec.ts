import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyLifestyle } from './healthy-lifestyle';

describe('HealthyLifestyle', () => {
  let component: HealthyLifestyle;
  let fixture: ComponentFixture<HealthyLifestyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthyLifestyle],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthyLifestyle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
