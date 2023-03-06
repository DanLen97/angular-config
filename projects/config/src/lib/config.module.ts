import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { ConfigModuleOptions } from './models/config-module-options.model';


const initializeApp = <T>(pathToConfig: string) => {
  return (config: ConfigService<T>) => () => config.loadConfig(pathToConfig);
};

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  exports: []
})
export class ConfigModule {
  static forRoot<T = unknown>({ configType: type, pathToConfig = 'assets/config.json' }: ConfigModuleOptions<T>): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        { provide: APP_INITIALIZER, multi: true, deps: [ConfigService], useFactory: initializeApp<T>(pathToConfig) },
        { provide: type, deps: [ConfigService], useFactory: (config: ConfigService<T>) => config.config}
      ]
    }
  }
}
