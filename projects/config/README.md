# Angular config service

This is a simple Angular service which loads a `config.json` on application statup and allows to access the config via a service.


## Installation

```node
npm install ngx-config-json
```


## Setup AppModule

```typescript
@NgModule({
  
  imports: [
    ...
    ConfigModule.forRoot('assets/config.json'), // path to config
    ...
  ],
})
export class AppModule { }
```

## Usage

Inject `ConfigService` in your application to access the config.

```typescript
interface ConfigModel {
  endpoint: string;
};

export class AppComponent {
  constructor(configService: ConfigService<ConfigModel>) {
    const config = configService.config;
  }
}
```
