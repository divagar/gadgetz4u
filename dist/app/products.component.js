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
var platform_browser_1 = require('@angular/platform-browser');
var ProductsComponent = (function () {
    function ProductsComponent(af, router, params, sanitizer) {
        this.af = af;
        this.router = router;
        this.params = params;
        this.sanitizer = sanitizer;
        this.fbCategories = af.database.object('/Gadgetz/Categories');
        //Route params
        //catrgory
        var pCat = params.getParam('c');
        if (pCat != undefined) {
            this.selectCategory(pCat);
        }
        //Brand
        var pBrand = params.getParam('b');
        var pBrandId = Number(params.getParam('bId'));
        if (pBrand != undefined && pBrandId != undefined) {
            this.selectBrand(pBrandId, pBrand);
        }
        //Products
        var pProduct = params.getParam('p');
        var pProductId = params.getParam('pId');
        if (pProduct != undefined && pProductId != undefined) {
            this.selectProduct(pProductId, pProduct);
        }
    }
    ProductsComponent.prototype.ngOnInit = function () {
    };
    ProductsComponent.prototype.selectDefault = function () {
        this.selectedCategory = null;
        this.selectedBrand = null;
        this.selectedBrandId = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.router.navigate(['/products']);
    };
    ProductsComponent.prototype.selectCategory = function (name) {
        this.selectedCategory = name;
        this.selectedBrand = null;
        this.selectedBrandId = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        var query = "/Gadgetz/" + this.selectedCategory + '/Brands';
        console.log(query);
        this.fbCategoriesBrands = this.af.database.object(query);
        //this.router.navigate(['/products/', { c: this.selectedCategory }]);
    };
    ProductsComponent.prototype.selectBrand = function (index, name) {
        this.selectedBrand = name;
        this.selectedBrandId = index;
        this.selectedProduct = null;
        this.selectedProductId = null;
        var query = "/Gadgetz/" + this.selectedCategory + '/Brands/' + index + '/Products';
        console.log(query);
        this.fbProducts = this.af.database.list(query).map(function (_products) {
            return _products.map(function (_product) {
                return _product;
            });
        });
        //this.router.navigate(['/products/', { c: this.selectedCategory, bId: this.selectedBrandId, b: this.selectedBrand }]);
    };
    ProductsComponent.prototype.selectProduct = function (id, name) {
        this.selectedProduct = decodeURIComponent(name);
        this.selectedProductId = id;
        var query = "/Gadgetz/" + this.selectedCategory + '/Brands/' + this.selectedBrandId + '/Products/' + id;
        console.log(query);
        this.fbProductDetails = this.af.database.object(query);
    };
    ProductsComponent.prototype.calcPer = function (price, mrp) {
        if (price != null && mrp != null) {
            var iPrice = price.replace(/\D/g, '');
            var iMrp = mrp.replace(/\D/g, '');
            var iPer = 100 - (parseInt(iPrice) / parseInt(iMrp) * 100);
            iPer = Math.floor(iPer);
            if (iPer != 0)
                return ("Save " + iPer + " %");
        }
    };
    ProductsComponent.prototype.isBrandActive = function (brand) {
        var currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
        var parameters = currentRoute == null ? null : currentRoute.parameters['b'];
        return parameters == brand;
    };
    ProductsComponent.prototype.encodeURIComponent = function (str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    };
    /* Alert */
    ProductsComponent.prototype.productalert = function (type, msg, status) {
        this.productAlertType = type;
        this.productAlertMsg = msg;
        this.productAlert = status;
    };
    ProductsComponent.prototype.closeAlert = function () {
        this.productAlert = false;
    };
    ProductsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'products',
            templateUrl: 'products.component.html',
            styleUrls: ['products.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, router_1.Router, router_1.RouteSegment, platform_browser_1.DomSanitizationService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map