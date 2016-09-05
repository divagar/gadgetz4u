import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DomSanitizationService } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

declare var FB: any;
declare var twttr: any;
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'products',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class ProductsComponent implements OnInit, AfterViewInit {
    fbCategories: Observable<any[]>;
    fbCategoriesBrands: Observable<any[]>;
    fbProducts: Observable<any[]>;
    fbProductDetails: FirebaseObjectObservable<any>;

    selectedCategory: string;
    selectedCategoryId: string;
    selectedBrand: string;
    selectedProduct: string;
    selectedProductId: string;

    productAlert: boolean;
    productAlertMsg: string;
    productAlertType: string;

    productQueryStatus: any

    constructor(
        public af: AngularFire,
        public router: Router,
        public params: RouteSegment,
        public sanitizer: DomSanitizationService,
        public titleService: Title) {

        //Set page title
        this.titleService.setTitle("Gadgetz4u India | Gadgetz");

        try {
            //Route params
            this.selectedCategory = params.getParam('c');
            this.selectedCategoryId = params.getParam('cId');
            this.selectedBrand = params.getParam('b');
            this.selectedProductId = params.getParam('pId');
            // if (params.getParam('p') != undefined)
            //     this.selectedProduct = decodeURIComponent(params.getParam('p'));

            //Get categories
            this.getCategories();

            //Get Brands
            if (this.selectedCategory != undefined && this.selectedCategoryId != undefined)
                this.getBrands();

            //Get Product Details
            //if (this.selectedProduct != undefined && this.selectedProductId != undefined)
            if (this.selectedProductId != undefined)
                this.getProductDetails();
            //Get Products
            else if (this.selectedCategory != undefined && this.selectedBrand != undefined)
                this.getProducts();
        }
        catch (e) {
            console.log("products constructor: error - " + e);
            this.router.navigate(['/products']);
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        try {
            //share button
            FB.XFBML.parse();
            twttr.widgets.load();
            //owl
            jQuery("#owl").owlCarousel({
                // Most important owl features
                singleItem: true,
                //Autoplay
                autoPlay: false,
                stopOnHover: true,
            });
        }
        catch (e) {
            console.log("Product ngAfterViewInit: error - " + e);
        }
    }

    selectDefault() {
        this.selectedCategory = null;
        this.selectedCategoryId = null;
        this.selectedBrand = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.router.navigate(['/products']);
    }

    getCategories() {
        var query: string = '/Categories';
        console.log(query);
        this.fbCategories = this.af.database.list(query).map((_categories) => {
            return _categories.map((_category) => {
                return _category;
            })
        });

        //product listing
        if (this.selectedCategory == undefined)
            this.getProductListing("Categories", undefined);
    }

    getBrands() {
        //Brand listing
        var query: string = "/Categories/" + this.selectedCategoryId + '/Brands';
        console.log(query);
        this.fbCategoriesBrands = this.af.database.list(query).map((_brands) => {
            return _brands.map((_brand) => {
                return _brand;
            })
        });

        //product listing
        if (this.selectedBrand == undefined)
            this.getProductListing("Categories", this.selectedCategory);
    }

    getProducts() {
        this.selectedProduct = null;
        this.selectedProductId = null;

        //product listing
        this.getProductListing("Categories_Brands", this.selectedCategory + '_' + this.selectedBrand);
    }

    getProductDetails() {
        //product detail listing
        var query: string = '/Products/' + this.selectedProductId;
        console.log(query);
        this.fbProductDetails = this.af.database.object(query);
    }

    getProductListing(orderby: string, equalto: string) {
        var queryUrl: string = '/Products/';
        console.log(queryUrl);
        //console.log("orderby = " + orderby + " equalto = " + equalto);

        var fbQuery;
        if (equalto != undefined) {
            fbQuery = {
                orderByChild: orderby,
                equalTo: equalto
            };
        }
        else {
            fbQuery = {
                orderByChild: orderby
            };
        }

        this.fbProducts = this.af.database.list(queryUrl, { query: fbQuery })
            .map((_products) => {
                if (_products.length == 0)
                    return undefined;
                else {
                    return _products.map((_product) => {
                        return _product;
                    })
                }
            });

        // Product Query status
        this.productQueryStatus = "Loading";
        this.fbProducts.subscribe(
            x => {
                //console.log('Next: %s', x);
                if (x == undefined)
                    this.productQueryStatus = "Empty";
                else
                    this.productQueryStatus = "Data";
            },
            e => {
                //console.log('Error: %s', e);
                this.productQueryStatus = "Error";
            },
            () => {
                //console.log('Completed');
                this.productQueryStatus = "Loading";
            }
        );
    }

    updatePageTileWithProductInfo(pName: string, pPrice: string, pMrp: string) {
        //title
        var title: string = "Gadgetz4u India | " + pName;
        //get saving
        var save: string = this.calcPer(pPrice, pMrp);
        if (save != null) {
            title += " | " + save;
        }
        //Set page title
        if (pName != null)
            this.titleService.setTitle(title);
    }

    CreateMetaElement(property: string, content: string) {
        //:HTMLElement {
        let el: HTMLElement;
        let DOM = getDOM();
        let headElement = DOM.query('head');
        let query = 'meta[property="' + property + '"]';

        el = DOM.query(query);
        if (el === null && content != null) {
            el = DOM.createElement('meta');
            el.setAttribute('property', property);
            el.setAttribute('content', content);
            headElement.appendChild(el);
        }
        //return el;
    }

    calcPer(price: string, mrp: string) {
        if (price != null && mrp != null) {
            var iPrice: string = price.replace(/\D/g, '');
            var iMrp: string = mrp.replace(/\D/g, '');
            var iPer: number = 100 - (parseInt(iPrice) / parseInt(iMrp) * 100);
            iPer = Math.floor(iPer);
            if (iPer > 0)
                return ("Save " + iPer + " %");
        }
    }

    isCategoryActive(category: string) {
        let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
        let parameters = currentRoute == null ? null : currentRoute.parameters['c'];
        return parameters == category;
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