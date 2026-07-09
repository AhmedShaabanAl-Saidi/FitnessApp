import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepHeaderComponent } from './step-header.component';

describe('StepHeaderComponent', () => {
  let component: StepHeaderComponent;
  let fixture: ComponentFixture<StepHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepHeaderComponent);
    component = fixture.componentInstance;
    
    // Set required input
    fixture.componentRef.setInput('title', 'Test Title');
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and conditionally subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent?.trim()).toBe('Test Title');
    expect(compiled.querySelector('p')).toBeNull();

    fixture.componentRef.setInput('subtitle', 'Test Subtitle');
    fixture.detectChanges();
    expect(compiled.querySelector('p')?.textContent?.trim()).toBe('Test Subtitle');
  });
});
