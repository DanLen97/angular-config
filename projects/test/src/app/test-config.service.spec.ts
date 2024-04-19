import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestConfigService } from './test-config.service';

describe('TestConfigService', () => {
  let service: TestConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(TestConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
