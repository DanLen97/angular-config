import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { createSpyObj } from 'jest-createspyobj';
import { of, throwError } from 'rxjs';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService<unknown>;
  let httpClientSpy: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientSpy = createSpyObj<HttpClient>(HttpClient, ['get']);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load config', async () => {
    const testConfig = { someProp: 1, someOtherProp: '1234' };
    httpClientSpy.get.mockReturnValue(of(testConfig));

    const res = await service.loadConfig('');

    expect(res).toEqual(testConfig);
  });

  it('should load config from a specific path', async () => {
    const path = 'assets/config.json';
    const spy = httpClientSpy.get.mockReturnValue(of({}));
    const res = await service.loadConfig(path);

    expect(res).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(path);
  });

  it('should set config field after config load', async () => {
    expect(service.config).toEqual(undefined);

    const testConfig = { someProp: 1, someOtherProp: '1234' };
    httpClientSpy.get.mockReturnValue(of(testConfig));
    await service.loadConfig('');

    expect(service.config).toEqual(testConfig);
  });

  it('should throw error on config load', async () => {
    httpClientSpy.get.mockReturnValue(throwError(() => 'error'));

    await expect(service.loadConfig('')).rejects.toEqual('error')
  });
});
