import { Injectable } from '@angular/core';
import { InternalConfigService } from './internal-config.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService<T = unknown> {

  public get config() { return this.internalConfig.config; }

  constructor(private readonly internalConfig: InternalConfigService<T>) {}
}
