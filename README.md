# Angular config service

This is a simple Angular service which loads a `config.json` on application statup and allows to inject the config model into your angular components.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [1. Create your config model class](#1-create-your-config-model-class)
  - [2. Setup via AppModule or with Provider function](#2-setup-via-appmodule-or-with-provider-function)
  - [3. Use the config in your application](#3-use-the-config-in-your-application)


## Installation

```node
npm install ngx-config-json
```


## Usage

### 1. Create your config model
Create your `config.json` file.
```js
// assets/config.json
{
  "endpoint": "http://localhost:8080/api"
}
```

And create its corresponding class.
```typescript
// config.model.ts
export class Config {
  endpoint!: string;
};
```

### 2. Setup via AppModule or with Provider function

```typescript
import { Config } from './config.model';
import { ConfigModule } from 'ngx-config-json';

@NgModule({
  ...
  imports: [
    ...
    ConfigModule.forRoot({
      configType: Config,
      pathToConfig: 'assets/config.json',
    }),
    ...
  ],
})
export class AppModule { }
```

OR

```typescript
bootstrapApplication(AppComponent, {
  providers: [
    ...
    provideConfig({
      configType: Config,
      pathToConfig: 'assets/config.json',
    }),
  ],
});
```

### 3. Use the config in your application

Inject `Config` in your application to directly access the config.

```typescript
import { Config } from './config.model';

@Component(...)
export class AppComponent {
  config = inject(Config);
}
```

Or inject the `ConfigService` to access the config via a service.
```ts
import { Config } from './config.model';
import { ConfigService } from 'ngx-config-json';

@Component(...)
export class AppComponent {
  config = inject(ConfigService<Config>).config;
}
```
