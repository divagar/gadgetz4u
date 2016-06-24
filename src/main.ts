import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Gadgetz4uAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(Gadgetz4uAppComponent,[
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyB5Kr4N-F1_L0t4a-d2CJ19S7OEmM-EfJM",
    authDomain: "project-8767314614573031660.firebaseapp.com",
    databaseURL: "https://project-8767314614573031660.firebaseio.com",
    storageBucket: "project-8767314614573031660.appspot.com",
  })
]);
