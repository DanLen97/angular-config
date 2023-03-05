# Angular config service

This is a simple Angular service which loads a `config.json` on application statup and allows to inject the config model into your angular components.


## Installation

```node
npm install ngx-config-json
```


## Create your config model class
```typescript
export class Config {
  endpoint!: string;
};
```

## Setup AppModule

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

## Usage

Inject `Config` in your application to access the config.

```typescript
export class AppComponent {
  constructor(private readonly config: Config) {
    console.log(config);
  }
}
```
