import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Gadgetz4uAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(Gadgetz4uAppComponent);
