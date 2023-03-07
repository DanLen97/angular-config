import { Type } from '@angular/core';

export interface ConfigModuleOptions<T> {
  configType: Type<T>,
  pathToConfig: string,
}
