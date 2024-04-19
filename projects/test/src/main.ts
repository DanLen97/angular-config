
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { ConfigService, provideConfig } from 'config';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { Config } from './app/config.model';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => () =>
        configService.configLoaded().then((config) => console.log(config)),
    },
    provideConfig({
      configType: Config,
      pathToConfig: 'assets/config.json',
    }),
  ],
}).catch((err) => console.error(err));
