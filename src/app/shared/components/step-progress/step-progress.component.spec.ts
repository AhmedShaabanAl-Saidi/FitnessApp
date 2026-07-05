import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepProgressComponent } from './step-progress.component';

describe('StepProgressComponent', () => {
  let component: StepProgressComponent;
  let fixture: ComponentFixture<StepProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepProgressComponent);
    component = fixture.componentInstance;
    
    // Set required input
    fixture.componentRef.setInput('currentStep', 1);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute circumference correctly', () => {
    expect(component.circumference()).toBeCloseTo(175.929, 2);
  });

  it('should calculate offset based on progress', () => {
    fixture.componentRef.setInput('currentStep', 3); // 3 of 6 (50%)
    fixture.detectChanges();
    expect(component.dashOffset()).toBeCloseTo(component.circumference() / 2, 2);
  });
});
