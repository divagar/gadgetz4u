"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var _1 = require('./app/');
var angularfire2_1 = require('angularfire2');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.Gadgetz4uAppComponent, [
    angularfire2_1.FIREBASE_PROVIDERS,
    angularfire2_1.defaultFirebase({
        apiKey: "AIzaSyB5Kr4N-F1_L0t4a-d2CJ19S7OEmM-EfJM",
        authDomain: "project-8767314614573031660.firebaseapp.com",
        databaseURL: "https://project-8767314614573031660.firebaseio.com",
        storageBucket: "project-8767314614573031660.appspot.com",
    })
]);
//# sourceMappingURL=main.js.map