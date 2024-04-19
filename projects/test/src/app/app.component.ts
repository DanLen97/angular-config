import { Component, inject } from '@angular/core';
import { ConfigService } from 'config';
import { Config } from './config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  config = inject(Config);
  config2 = inject(ConfigService<Config>).config;
}
