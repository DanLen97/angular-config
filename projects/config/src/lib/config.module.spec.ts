import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createSpyObj } from 'jest-createspyobj';
import { of } from 'rxjs';
import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';
import { ConfigModuleOptions } from './models/config-module-options.model';

@Component({
  selector: 'lib-test-config',
})
class TestConfigComponent {
  constructor(public readonly config: Config, public readonly configService: ConfigService<Config>) {}
}

class Config {
  endpoint!: string;
  identifier?: 'A' | 'B';
}

const TEST_CONFIG: Config = {
  endpoint: '12345',
};

describe('ConfigModule', () => {
  let httpClientSpy: jest.Mocked<HttpClient>;

  const createModuleWithConfig = async (config: Config, opts: ConfigModuleOptions<Config> = { configType: Config, pathToConfig: '' }) => {
    httpClientSpy = createSpyObj<HttpClient>(HttpClient, ['get']);
    httpClientSpy.get.mockReturnValue(of(config));
    await TestBed.configureTestingModule({
      declarations: [ TestConfigComponent ],
      imports: [
        ConfigModule.forRoot({ ...opts }),
      ],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    }).compileComponents();
  }

  it('should create the module', async () => {
    await createModuleWithConfig(TEST_CONFIG);
    const module = TestBed.inject(ConfigModule);
    expect(module).toBeTruthy();
  });

  it('should inject config into a component', async () => {
    await createModuleWithConfig(TEST_CONFIG);
    const fixture = TestBed.createComponent(TestConfigComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
    expect(component.config).toEqual(TEST_CONFIG);
    expect(component.configService.config).toEqual(TEST_CONFIG);
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
