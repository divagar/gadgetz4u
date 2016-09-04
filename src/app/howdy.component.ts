import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/RX';
import { Title } from '@angular/platform-browser';

declare var jQuery: any;
declare var tinymce: any;

@Component({
    moduleId: module.id,
    selector: 'howdy',
    templateUrl: 'howdy.component.html',
    styleUrls: ['howdy.component.css'],
    providers: [LoginComponent]
})

export class HowdyComponent implements OnInit, AfterViewInit {
    fbCategories: FirebaseObjectObservable<any>;
    fbCategoriesBrands: FirebaseObjectObservable<any>;
    fbProducts: Observable<any[]>;
    fbProductDetails: FirebaseObjectObservable<any>;

    fbNewCategories: FirebaseListObservable<any>;
    fbNewProduct: FirebaseListObservable<any>;

    selectedCategory: string;
    selectedCategoryId: number;
    selectedBrand: string;
    selectedBrandId: number;
    selectedProduct: string;
    selectedProductId: number;

    addNewCategory: boolean;
    addNewBrand: boolean;
    addNewProduct: boolean;

    timerTiny: any;

    howdyAlert: boolean;
    howdyAlertMsg: string;
    howdyAlertType: string;

    constructor(public af: AngularFire,
        public loginUser: LoginComponent,
        public router: Router,
        private titleService: Title) {

        //Set page title
        this.titleService.setTitle("Gadgetz4u India | Dashboard");

        //get af auth status
        af.auth
            .do(v => this.howdyLogin(v))
            .subscribe(user => this.howdyLogin(user))
    }

    ngOnInit() {

    }

    ngAfterViewInit() {

    }

    howdyLogin(user) {
        //check user credentials
        this.loginUser.userCredentials(user);
        if (this.loginUser.user == null)
            this.router.navigate(['/login']);
        else
            //selectCategory
            this.getCategory();
    }

    howdyLogout() {
        this.loginUser.logoutUser();
    }

    getCategory() {
        var query: string = "/Categories"
        console.log(query);
        this.fbCategories = this.af.database.object(query);
    }

    getBrands(index: number, name: string) {
        this.selectedCategory = name;
        this.selectedCategoryId = index;
        this.selectedBrand = null;
        this.selectedBrandId = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewCategory = false;
        this.addNewBrand = false;
        this.addNewProduct = false;

        var query: string = "/Categories/" + this.selectedCategoryId + '/Brands';
        console.log(query);
        this.fbCategoriesBrands = this.af.database.object(query);
    }

    getProducts(index: number, pBrand: string) {
        this.selectedBrand = pBrand;
        this.selectedBrandId = index;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewCategory = false;
        this.addNewBrand = false;
        this.addNewProduct = false;

        var query: string = '/Products';
        console.log(query);
        this.fbProducts = this.af.database.list(query, {
            query: {
                orderByChild: "Categories_Brands",
                equalTo: this.selectedCategory + '_' + pBrand
            }
        }).map((_products) => {
            return _products.map((_product) => {
                return _product;
            })
        });
    }

    getProduct(index: number, name: string) {
        this.selectedProduct = name;
        this.selectedProductId = index;
        this.addNewCategory = false;
        this.addNewBrand = false;
        this.addNewProduct = false;

        var query: string = '/Products/' + index;
        console.log(query);
        this.fbProductDetails = this.af.database.object(query);
    }

    newCategory() {
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewCategory = true;
        this.addNewBrand = false;
        this.addNewProduct = false;

        this.fbProducts = null;
        this.fbProductDetails = null;
    }

    newBrand() {
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewCategory = false;
        this.addNewBrand = true;
        this.addNewProduct = false;

        this.fbProducts = null;
        this.fbProductDetails = null;
    }

    newProduct() {
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewCategory = false;
        this.addNewBrand = false;
        this.addNewProduct = true;

        this.fbProductDetails = null;
        tinymce.activeEditor.setContent("");
    }

    addCategory(name: string) {
        console.log('addCategory');
        console.log(name);
        var query: string = "/Categories"
        console.log(query);

        this.howdyalert('info', 'Processing.', true);
        this.fbNewCategories = this.af.database.list(query);
        const promise = this.fbNewCategories.push({'Name': name, 'Brands': ''});
        promise
            .then(_ => this.howdyalert('success', 'New Category created successfully.', true))
            .catch(err => this.howdyalert('warning', 'Error occurred while update.', true));
    }

    addBrand(name: string) {
        console.log('addBrand');
        console.log(name);
    }

    loadTinyMCE(details: string) {
        tinymce.init({
            selector: "[tinyMCE]",
            menubar: false,
            toolbar1: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify styleselect bullist numlist outdent indent blockquote undo redo removeformat subscript superscript",
        });
        if (tinymce.activeEditor.getContent() == "") {
            clearTimeout(this.timerTiny);
            this.timerTiny = setTimeout(() => this.tinyMCESetContent(details), 1000);
        }
        return details;
    }

    tinyMCESetContent(content) {
        //console.log("content = " + content);
        tinymce.activeEditor.setContent(content);
        clearTimeout(this.timerTiny);
    }

    addProduct(name: string, desc: string, imgUrl: string, imgUrl1: string, imgUrl2: string, imgUrl3: string,
        details: string, mrp: string, price: string) {
        var data: Object;
        details = tinymce.activeEditor.getContent();
        data = {
            'Categories': this.selectedCategory,
            'Brands': this.selectedBrand,
            'Categories_Brands': this.selectedCategory + "_" + this.selectedBrand,
            'CategoriesId': this.selectedCategoryId,
            'Name': name,
            'Description': desc,
            'ImageLink': imgUrl,
            'ImageLink1': imgUrl1,
            'ImageLink2': imgUrl2,
            'ImageLink3': imgUrl3,
            'Details': details,
            'MRP': mrp,
            'Price': price
        }
        //console.log(data);
        //console.log(details);
        var query: string = '/Products';
        console.log(query);
        this.howdyalert('info', 'Processing.', true);
        this.fbNewProduct = this.af.database.list(query);
        const promise = this.fbNewProduct.push(data);
        promise
            .then(_ => this.howdyalert('success', 'New product added successfully.', true))
            .catch(err => this.howdyalert('warning', 'Error occurred while addding product.', true));
    }

    updateProduct(name: string, desc: string, imgUrl: string, imgUrl1: string, imgUrl2: string, imgUrl3: string,
        details: string, mrp: string, price: string) {
        var data: Object;
        details = tinymce.activeEditor.getContent();
        data = {
            'Name': name,
            'Description': desc,
            'ImageLink': imgUrl,
            'ImageLink1': imgUrl1,
            'ImageLink2': imgUrl2,
            'ImageLink3': imgUrl3,
            'Details': details,
            'MRP': mrp,
            'Price': price
        }
        this.howdyalert('info', 'Processing.', true);
        const promise = this.fbProductDetails.update(data);
        promise
            .then(_ => this.howdyalert('success', 'Product updated successfully.', true))
            .catch(err => this.howdyalert('warning', 'Error occurred while update.', true));
    }

    deleteProduct() {
        this.howdyalert('info', 'Processing.', true);
        const promise = this.fbProductDetails.remove();
        promise
            .then(_ => this.howdyalert('success', 'Product deleted successfully.', true))
            .catch(err => this.howdyalert('warning', 'Error occurred while delete.', true));
    }

    howdyalert(type, msg, status) {
        this.howdyAlertType = type;
        this.howdyAlertMsg = msg;
        this.howdyAlert = status;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewCategory = false;
        this.addNewBrand = false;
        this.addNewProduct = false;
    }

    closeAlert() {
        this.howdyAlert = false;
    }
}