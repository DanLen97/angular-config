import { Component } from '@angular/core';
import { Config } from './config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';

  constructor(private readonly config: Config) {
    console.log(config);
  }
}
