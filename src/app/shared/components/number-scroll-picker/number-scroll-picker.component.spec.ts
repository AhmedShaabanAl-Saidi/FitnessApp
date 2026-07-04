import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberScrollPickerComponent } from './number-scroll-picker.component';

describe('NumberScrollPickerComponent', () => {
  let component: NumberScrollPickerComponent;
  let fixture: ComponentFixture<NumberScrollPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberScrollPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberScrollPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate numbers list based on min/max', () => {
    fixture.componentRef.setInput('min', 1);
    fixture.componentRef.setInput('max', 5);
    fixture.componentRef.setInput('step', 1);
    fixture.detectChanges();
    expect(component.numbers()).toEqual([1, 2, 3, 4, 5]);
  });

  it('should change value and emit when scrollToValue is called', async () => {
    component.scrollToValue(30);
    await new Promise(resolve => setTimeout(resolve, 60));
    expect(component.value()).toBe(30);
  });
});
