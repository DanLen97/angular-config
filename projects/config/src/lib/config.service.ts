import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService<T> {

  public get config(): T { return this.internalConfigService.config$.value as T; }
  public configLoaded(): Promise<T> {
    return firstValueFrom(this.internalConfigService.config$.pipe(filter(c => !!c), map(c => c as T)))
  }

  constructor(private readonly internalConfigService: InternalConfigService<T>) { }

}

@Injectable({
  providedIn: 'root'
})
export class InternalConfigService<T> {
  public config$ = new BehaviorSubject<T | undefined>(undefined);

  constructor(private readonly httpClient: HttpClient) { }

  public loadConfig(pathToConfig: string) {
    return firstValueFrom(this.httpClient.get<T>(pathToConfig).pipe(tap({
      next: res => this.config$.next(res),
      error: e => this.config$.error(e),
    })));
  }
}
