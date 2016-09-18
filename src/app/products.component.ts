import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { Subject } from 'rxjs/Subject';
import { Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { Routes, Router, ActivatedRoute } from '@angular/router';

declare var FB: any;
declare var twttr: any;
declare var jQuery: any;

@Component({
    selector: 'products',
    templateUrl: 'products.component.html',
    styleUrls: ['products.component.css']
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
        public route: ActivatedRoute,
        public sanitizer: DomSanitizer,
        public titleService: Title) {

        //Set page title
        this.titleService.setTitle("Gadgetz4u India | Gadgetz");

        try {
            //Get Route params
            route.params.subscribe(
                params => {
                    this.selectedCategory = params['c'];
                    this.selectedCategoryId = params['cId'];
                    this.selectedBrand = params['b'];
                    this.selectedProductId = params['pId'];

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
            );
            // if (params.getParam('p') != undefined)
            //     this.selectedProduct = decodeURIComponent(params.getParam('p'));
        }
        catch (e) {
            console.log("products constructor: error - " + e);
            this.router.navigate(['/products']);
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    loadCarousel() {
        try {
            let el, el1: HTMLElement;
            let DOM = getDOM();

            el = DOM.query('div.mSlickCarousel');
            el1 = DOM.query('div.mSlickCarousel.slick-initialized');

            if (el !== null && el1 === null) {
                //slick carousel
                jQuery(".mSlickCarousel").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    fade: true,
                    asNavFor: '.tSlickCarousel'
                });
                jQuery(".tSlickCarousel").slick({
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    asNavFor: '.mSlickCarousel',
                    dots: true,
                    arrows: true,
                    centerMode: false,
                    vertical: false,
                    focusOnSelect: true
                });
                //share button
                FB.XFBML.parse();
                twttr.widgets.load();
            }
        }
        catch (e) {
            console.log("call scripts getProductDetails: error - " + e);
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
        this.fbCategories = map.call(this.af.database.list(query, {}), (_categories: any[]) => {
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
        this.fbCategoriesBrands = map.call(this.af.database.list(query, {}), (_brands: any[]) => {
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

        this.fbProducts = map.call(this.af.database.list(queryUrl, { query: fbQuery }),
            (_products: any[]) => {
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
        //TODO
        // let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
        // let parameters = currentRoute == null ? null : currentRoute.parameters['c'];
        // return parameters == category;
    }
    isBrandActive(brand: string) {
        //TODO
        // let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
        // let parameters = currentRoute == null ? null : currentRoute.parameters['b'];
        // return parameters == brand;
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