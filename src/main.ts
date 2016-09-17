import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { Gadgetz4uModule } from './app/gadgetz4u.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(Gadgetz4uModule);