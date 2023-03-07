import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigModule, ConfigService } from 'config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Config } from './config.model';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigModule.forRoot({
      configType: Config,
      pathToConfig: 'assets/config.json',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (configService: ConfigService<Config>) => () => configService.configLoaded().then(config => console.log(config))
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
