import { TestBed } from '@angular/core/testing';

import { InternalConfigService } from './internal-config.service';

describe('InternalConfigService', () => {
  let service: InternalConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
