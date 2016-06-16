import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Gadgetz4uAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(Gadgetz4uAppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase('https://project-8767314614573031660.firebaseio.com/')
]);
