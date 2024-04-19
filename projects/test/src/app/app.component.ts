import { Component, inject } from '@angular/core';
import { ConfigService } from 'config';
import { Config } from './config.model';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [JsonPipe]
})
export class AppComponent {
  config = inject(Config);
  config2 = inject(ConfigService<Config>).config;
}
