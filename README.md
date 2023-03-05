# Angular config service

This is a simple Angular service which loads a `config.json` on application statup and allows to inject the config model into your angular components.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [1. Create your config model class](#1-create-your-config-model-class)
  - [2. Setup AppModule](#2-setup-appmodule)
  - [3. Use the config in your application](#3-use-the-config-in-your-application)


## Installation

```node
npm install ngx-config-json
```


## Usage

### 1. Create your config model class
```typescript
export class Config {
  endpoint!: string;
};
```

### 2. Setup AppModule

```typescript
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

### 3. Use the config in your application

Inject `Config` in your application to access the config.

```typescript
export class AppComponent {
  constructor(private readonly config: Config) {
    console.log(config);
  }
}
```
