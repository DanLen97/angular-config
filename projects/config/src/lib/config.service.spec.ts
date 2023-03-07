import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { createSpyObj } from 'jest-createspyobj';
import { of, throwError } from 'rxjs';

import { ConfigService, InternalConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService<unknown>;
  let internalService: InternalConfigService<unknown>;
  let httpClientSpy: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientSpy = createSpyObj<HttpClient>(HttpClient, ['get']);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(ConfigService);
    internalService = TestBed.inject(InternalConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config', async () => {
    const testConfig = { someProp: 1, someOtherProp: '1234' };
    httpClientSpy.get.mockReturnValue(of(testConfig));

    const res = await internalService.loadConfig('');

    expect(res).toEqual(testConfig);
  });

  it('should load config from a specific path', async () => {
    const path = 'assets/config.json';
    const spy = httpClientSpy.get.mockReturnValue(of({}));
    const res = await internalService.loadConfig(path);

    expect(res).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(path);
  });

  it('should set config field after config load', async () => {
    expect(service.config).toEqual(undefined);

    const testConfig = { someProp: 1, someOtherProp: '1234' };
    httpClientSpy.get.mockReturnValue(of(testConfig));
    await internalService.loadConfig('');

    expect(service.config).toEqual(testConfig);
  });

  it('should throw error on config load', async () => {
    httpClientSpy.get.mockReturnValue(throwError(() => 'error'));

    await expect(internalService.loadConfig('')).rejects.toEqual('error')
  });

  it('should be initialize with undefined if no config is loaded', () => {
    expect(service.config).toBeUndefined();
  });

  it('should resolve config loaded', async () => {
    const testConfig = { someProp: 1, someOtherProp: '1234' };
    httpClientSpy.get.mockReturnValue(of(testConfig));

    internalService.loadConfig('');

    const config = await service.configLoaded();

    expect(config).toEqual(testConfig);
  });

  it('should reject config loaded', async () => {
    httpClientSpy.get.mockReturnValue(throwError(() => 'error'));

    expect(internalService.loadConfig('')).rejects.toEqual('error')
    await expect(service.configLoaded()).rejects.toEqual('error');
  });

});
