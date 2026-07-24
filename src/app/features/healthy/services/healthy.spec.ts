import { TestBed } from '@angular/core/testing';

import { Healthy } from './healthy';

describe('Healthy', () => {
  let service: Healthy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Healthy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
