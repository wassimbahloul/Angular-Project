import { TestBed } from '@angular/core/testing';

import { FactureadminService } from './factureadmin.service';

describe('FactureadminService', () => {
  let service: FactureadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactureadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
