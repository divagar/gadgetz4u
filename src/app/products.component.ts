import { Component, OnInit } from '@angular/core';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DomSanitizationService } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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
    selectedCategoryId: number;
    selectedBrand: string;
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

        //selectCategory
        this.selectCategory();

        //Route params
        //Brands
        var pCat = params.getParam('c');
        var pCatId: number = Number(params.getParam('cId'));
        if (pCat != undefined && pCatId != undefined) {
            this.selectBrands(pCatId, pCat)
        }
        //Products
        var pCat = params.getParam('c');
        var pBrand = params.getParam('b');
        if (pCat != undefined && pBrand != undefined) {
            this.selectProducts(pCat, pBrand);
        }
        //Product Details
        var pProduct = params.getParam('p');
        var pProductId = params.getParam('pId');
        if (pProduct != undefined && pProductId != undefined) {
            this.selectProductDetails(pProductId, pProduct);
        }
    }

    ngOnInit() {
    }

    selectDefault() {
        this.selectedCategory = null;
        this.selectedCategoryId = null;
        this.selectedBrand = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.router.navigate(['/products']);
    }

    selectCategory() {
        var query: string = '/Categories';
        console.log(query);
        this.fbCategories = this.af.database.object(query);
    }

    selectBrands(index: number, pCat: string) {
        this.selectedCategory = pCat;
        this.selectedCategoryId = index;
        this.selectedBrand = null;
        this.selectedProduct = null;
        this.selectedProductId = null;

        var query: string = '/Categories/' + this.selectedCategoryId + '/Brands';
        console.log(query);
        this.fbCategoriesBrands = this.af.database.object(query);

        var query: string = '/Products/';
        console.log(query);
        this.fbProducts = this.af.database.list(query, {
            query: {
                orderByChild: "Categories",
                equalTo: pCat
            }
        }).map((_products) => {
            return _products.map((_product) => {
                return _product;
            })
        });
    }

    selectProducts(pCat: string, pBrand: string) {
        this.selectedBrand = pBrand;
        this.selectedProduct = null;
        this.selectedProductId = null;

        var query: string = '/Products/';
        console.log(query);
        this.fbProducts = this.af.database.list(query, {
            query: {
                orderByChild: "Brands",
                equalTo: pBrand
            }
        }).map((_products) => {
            return _products.map((_product) => {
                return _product;
            })
        });
    }

    selectProductDetails(id: string, name: string) {
        this.selectedProduct = decodeURIComponent(name);
        this.selectedProductId = id;

        var query: string = '/Products/' + id;
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