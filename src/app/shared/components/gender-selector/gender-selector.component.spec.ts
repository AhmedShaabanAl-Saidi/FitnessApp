import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenderSelectorComponent } from './gender-selector.component';

describe('GenderSelectorComponent', () => {
  let component: GenderSelectorComponent;
  let fixture: ComponentFixture<GenderSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on selectGender', () => {
    expect(component.value()).toBeNull();
    component.selectGender('male');
    expect(component.value()).toBe('male');
    component.selectGender('female');
    expect(component.value()).toBe('female');
  });
});
