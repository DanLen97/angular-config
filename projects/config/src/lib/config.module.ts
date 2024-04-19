import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, EnvironmentProviders, ModuleWithProviders, NgModule, makeEnvironmentProviders } from '@angular/core';
import { ConfigService, InternalConfigService } from './config.service';
import { ConfigModuleOptions } from './models/config-module-options.model';


const initializeApp = <T>(pathToConfig: string) => {
  return (config: InternalConfigService<T>) => () => config.loadConfig(pathToConfig);
};

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [],
})
export class ConfigModule {
  static forRoot<T = unknown>({
    configType: type,
    pathToConfig = 'assets/config.json',
  }: ConfigModuleOptions<T>): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          deps: [InternalConfigService],
          useFactory: initializeApp<T>(pathToConfig),
        },
        {
          provide: type,
          deps: [ConfigService],
          useFactory: (config: ConfigService<T>) => config.config,
        },
      ],
    };
  }
}

export const provideConfig = <T = unknown>({
  configType: type,
  pathToConfig = 'assets/config.json',
}: ConfigModuleOptions<T>): EnvironmentProviders => {
  return makeEnvironmentProviders([
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [InternalConfigService],
      useFactory: initializeApp<T>(pathToConfig),
    },
    {
      provide: type,
      deps: [ConfigService],
      useFactory: (config: ConfigService<T>) => config.config,
    },
  ]);
};
