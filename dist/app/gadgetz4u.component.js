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
var home_component_1 = require('./home.component');
var products_component_1 = require('./products.component');
var contact_component_1 = require('./contact.component');
var about_component_1 = require('./about.component');
var howdy_component_1 = require('./howdy.component');
var login_component_1 = require('./login.component');
var router_1 = require('@angular/router');
var Gadgetz4uAppComponent = (function () {
    function Gadgetz4uAppComponent(router) {
        this.router = router;
    }
    ;
    Gadgetz4uAppComponent.prototype.isRouteActive = function (path) {
        var currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
        var segment = currentRoute == null ? '/' : currentRoute.segment;
        return segment == path;
    };
    Gadgetz4uAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gadgetz4u',
            templateUrl: 'gadgetz4u.component.html',
            styleUrls: ['gadgetz4u.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [router_1.ROUTER_PROVIDERS]
        }),
        router_1.Routes([
            {
                path: '/login', component: login_component_1.LoginComponent
            },
            {
                path: '/howdy', component: howdy_component_1.HowdyComponent
            },
            {
                path: '/home', component: home_component_1.HomeComponent
            },
            {
                path: '/products', component: products_component_1.ProductsComponent
            },
            {
                path: '/products/:', component: products_component_1.ProductsComponent
            },
            {
                path: '/contact', component: contact_component_1.ContactComponent
            },
            {
                path: '/about', component: about_component_1.AboutComponent
            },
            {
                path: '/', component: home_component_1.HomeComponent
            }
        ]), 
        __metadata('design:paramtypes', [router_1.Router])
    ], Gadgetz4uAppComponent);
    return Gadgetz4uAppComponent;
}());
exports.Gadgetz4uAppComponent = Gadgetz4uAppComponent;
//# sourceMappingURL=gadgetz4u.component.js.map