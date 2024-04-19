import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'config';
import { AppComponent } from './app.component';
import { Config } from './config.model';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        AppComponent
    ],
    providers: [
        { provide: Config, useValue: {} },
        { provide: ConfigService, useValue: {} },
    ]
}).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
