import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { InternalConfigService } from './internal-config.service';

describe('InternalConfigService', () => {
  let service: InternalConfigService<any>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['get']);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(InternalConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config', async () => {
    const testConfig = { someProp: 1, someOtherProp: '1234' };
    httpClientSpy.get.and.returnValue(of(testConfig));

    const res = await service.loadConfig('');

    expect(res).toEqual(testConfig);
  });

  it('should load config from a specific path', async () => {
    const path = 'assets/config.json';
    const spy = httpClientSpy.get.withArgs(path).and.returnValue(of({}));
    const res = await service.loadConfig(path);

    expect(res).toBeTruthy();
    expect(spy).toHaveBeenCalledOnceWith(path);
  });

  it('should set config field after config load', async () => {
    expect(service.config).toEqual(undefined);

    const testConfig = { someProp: 1, someOtherProp: '1234' };
    httpClientSpy.get.and.returnValue(of(testConfig));
    await service.loadConfig('');

    expect(service.config).toEqual(testConfig);
  });

  it('should throw error on config load', async () => {
    httpClientSpy.get.and.returnValue(throwError(() => 'error'));

    await expectAsync(service.loadConfig('')).toBeRejected();
  });
});
