import { Component } from '@angular/core';
import { ConfigService } from 'config';
import { Config } from './config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';

  constructor(public configService: ConfigService<Config>) {
    const config = configService.config;
    //     ^?
    console.log(configService.config.endpoint);
  }
}
