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
    apiKey: "AIzaSyAhazzDCJPH0ADelG3bZ_HJyy8PMKlmfiY",
    authDomain: "gadgetz-3396f.firebaseapp.com",
    databaseURL: "https://gadgetz-3396f.firebaseio.com",
    storageBucket: "gadgetz-3396f.appspot.com",
  })
]);
