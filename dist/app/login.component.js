"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angularfire2_1 = require('angularfire2');
require('rxjs/add/operator/do');
var LoginComponent = (function () {
    function LoginComponent(af, router) {
        var _this = this;
        this.af = af;
        this.router = router;
        af.auth
            .do(function (v) { return _this.userCredentials(v); })
            .subscribe(function (user) { return _this.userCredentials(user); });
    }
    /* login user */
    LoginComponent.prototype.loginUser = function (email, password) {
        var _this = this;
        this.af.auth.login({ email: email, password: password }, {
            method: angularfire2_1.AuthMethods.Password,
            provider: angularfire2_1.AuthProviders.Password
        })
            .then(function (user) { return _this.loginSuccess(user); })
            .catch(function (e) { return _this.loginFailed(e); });
    };
    LoginComponent.prototype.logoutUser = function () {
        this.af.auth.logout();
        this.router.navigate(['/login']);
    };
    LoginComponent.prototype.loginSuccess = function (user) {
        this.loginalert('info', 'Login successfull.', true);
        this.checkCredentials();
    };
    LoginComponent.prototype.loginFailed = function (e) {
        this.loginalert('danger', 'Login ' + e, true);
    };
    LoginComponent.prototype.userCredentials = function (user) {
        this.user = user;
    };
    LoginComponent.prototype.checkCredentials = function () {
        console.log(this.user);
        if (this.user != null)
            this.router.navigate(['/howdy']);
        else
            this.router.navigate(['/login']);
    };
    /* Alert */
    LoginComponent.prototype.loginalert = function (type, msg, status) {
        this.loginAlertType = type;
        this.loginAlertMsg = msg;
        this.loginAlert = status;
    };
    LoginComponent.prototype.closeAlert = function () {
        this.loginAlert = false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map