import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ClassDetails } from './class-details';
import { MuscleService } from '../../../shared/services/muscle-service';

describe('ClassDetails', () => {
  let component: ClassDetails;
  let fixture: ComponentFixture<ClassDetails>;

  beforeEach(async () => {
    const muscleServiceSpy = jasmine.createSpyObj('MuscleService', [
      'getMuscleById',
      'getDifficultyLevelsForMuscle',
      'getExercisesByMuscleAndDifficulty',
      'getMealSefoad',
    ]);

    muscleServiceSpy.getMuscleById.and.returnValue(
      of({
        message: 'ok',
        muscleGroup: { _id: '1', name: 'Chest', image: null },
        muscles: [],
      }),
    );
    muscleServiceSpy.getDifficultyLevelsForMuscle.and.returnValue(
      of({
        message: 'ok',
        totalLevels: 1,
        difficulty_levels: [{ id: 'beginner', name: 'Beginner' }],
      }),
    );
    muscleServiceSpy.getExercisesByMuscleAndDifficulty.and.returnValue(
      of({
        message: 'ok',
        totalExercises: 0,
        totalPages: 1,
        currentPage: 1,
        exercises: [],
      }),
    );
    muscleServiceSpy.getMealSefoad.and.returnValue(of({ meals: [] }));

    await TestBed.configureTestingModule({
      imports: [ClassDetails],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
        {
          provide: MuscleService,
          useValue: muscleServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
