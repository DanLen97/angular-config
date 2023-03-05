import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createSpyObj } from 'jest-createspyobj';
import { of } from 'rxjs';
import { ConfigModule } from './config.module';

@Component({
  selector: 'lib-test-config',
})
class TestConfigComponent {
  constructor(public readonly config: Config) {}
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

  const createModuleWithConfig = async (config: Config) => {
    httpClientSpy = createSpyObj<HttpClient>(HttpClient, ['get']);
    httpClientSpy.get.mockReturnValue(of(config));
    await TestBed.configureTestingModule({
      declarations: [ TestConfigComponent ],
      imports: [
        ConfigModule.forRoot({
          configType: Config
        })
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
  });
});
