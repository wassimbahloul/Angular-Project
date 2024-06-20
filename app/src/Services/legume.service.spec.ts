import { TestBed } from '@angular/core/testing';

import { LegumeService } from './legume.service';

describe('LegumeService', () => {
  let service: LegumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
