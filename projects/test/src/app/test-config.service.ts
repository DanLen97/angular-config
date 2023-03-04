import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestConfigService {

  private _config: unknown;

  public get config() { return this._config; }

  constructor(private readonly httpClient: HttpClient) { }

  public async loadConfig() {
    return firstValueFrom(this.httpClient.get<unknown>('assets/config.json').pipe(tap({
      next: res => this._config = res,
    })));
  }
}
