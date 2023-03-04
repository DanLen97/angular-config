import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalConfigService<T> {

  public config!: T;

  constructor(private readonly httpClient: HttpClient) { }

  public async loadConfig(pathToConfig: string) {
    return firstValueFrom(this.httpClient.get<T>(pathToConfig).pipe(tap({
      next: res => this.config = res,
    })));
  }
}
