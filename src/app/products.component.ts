import { Component, OnInit } from '@angular/core';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DomSanitizationService } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'products',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class ProductsComponent implements OnInit {
    fbCategories: FirebaseObjectObservable<any>;
    fbCategoriesBrands: FirebaseObjectObservable<any>;
    fbProducts: Observable<any[]>;
    fbProductDetails: FirebaseObjectObservable<any>;

    selectedCategory: string;
    selectedBrand: string;
    selectedBrandId: number;
    selectedProduct: string;
    selectedProductId: string;

    productAlert: boolean;
    productAlertMsg: string;
    productAlertType: string;

    constructor(
        public af: AngularFire,
        public router: Router,
        public params: RouteSegment,
        public sanitizer: DomSanitizationService) {
        this.fbCategories = af.database.object('/Gadgetz/Categories');

        //Route params
        //catrgory
        var pCat = params.getParam('c');
        if (pCat != undefined) {
            this.selectCategory(pCat)
        }
        //Brand
        var pBrand = params.getParam('b');
        var pBrandId: number = Number(params.getParam('bId'));
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

    ngOnInit() {
    }

    selectDefault() {
        this.selectedCategory = null;
        this.selectedBrand = null;
        this.selectedBrandId = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.router.navigate(['/products']);
    }

    selectCategory(name: string) {
        this.selectedCategory = name;
        this.selectedBrand = null;
        this.selectedBrandId = null;
        this.selectedProduct = null;
        this.selectedProductId = null;

        var query: string = "/Gadgetz/" + this.selectedCategory + '/Brands';
        console.log(query);
        this.fbCategoriesBrands = this.af.database.object(query);
        //this.router.navigate(['/products/', { c: this.selectedCategory }]);
    }

    selectBrand(index: number, name: string) {
        this.selectedBrand = name;
        this.selectedBrandId = index;
        this.selectedProduct = null;
        this.selectedProductId = null;

        var query: string = "/Gadgetz/" + this.selectedCategory + '/Brands/' + index + '/Products';
        console.log(query);
        this.fbProducts = this.af.database.list(query).map((_products) => {
            return _products.map((_product) => {
                return _product;
            })
        })
        //this.router.navigate(['/products/', { c: this.selectedCategory, bId: this.selectedBrandId, b: this.selectedBrand }]);
    }

    selectProduct(id: string, name: string) {
        this.selectedProduct = decodeURIComponent(name);
        this.selectedProductId = id;

        var query: string = "/Gadgetz/" + this.selectedCategory + '/Brands/' + this.selectedBrandId + '/Products/' + id;
        console.log(query);
        this.fbProductDetails = this.af.database.object(query);
    }

    calcPer(price: string, mrp: string) {
        if (price != null && mrp != null) {
            var iPrice: string = price.replace(/\D/g, '');
            var iMrp: string = mrp.replace(/\D/g, '');
            var iPer: number = 100 - (parseInt(iPrice) / parseInt(iMrp) * 100);
            iPer = Math.floor(iPer);
            if (iPer != 0)
                return ("Save " + iPer + " %");
        }
    }

    isBrandActive(brand: string) {
        let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
        let parameters = currentRoute == null ? null : currentRoute.parameters['b'];
        return parameters == brand;
    }

    encodeURIComponent(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    }

    /* Alert */
    productalert(type, msg, status) {
        this.productAlertType = type;
        this.productAlertMsg = msg;
        this.productAlert = status;
    }
    closeAlert() {
        this.productAlert = false;
    }
}