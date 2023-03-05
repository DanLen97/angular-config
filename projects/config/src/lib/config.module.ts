import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { InternalConfigService } from './internal-config.service';


const initializeApp = <T>(pathToConfig: string) => {
  return (config: InternalConfigService<T>) => () => config.loadConfig(pathToConfig);
};

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  exports: []
})
export class ConfigModule {
  static forRoot<T = unknown>({ configType: type, pathToConfig = 'assets/config.json' }: {configType: Type<T>, pathToConfig: string }): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        { provide: APP_INITIALIZER, multi: true, deps: [InternalConfigService], useFactory: initializeApp<T>(pathToConfig) },
        { provide: type, deps: [InternalConfigService], useFactory: (config: InternalConfigService<T>) => config.config}
      ]
    }
  }
}
