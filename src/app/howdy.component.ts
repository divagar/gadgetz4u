import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { LoginComponent } from './login.component';
import { Observable } from 'rxjs/RX';

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
    fbNewProduct: FirebaseListObservable<any>;

    selectedCategory: string;
    selectedBrand: string;
    selectedBrandId: number;
    selectedProduct: string;
    selectedProductId: number;
    addNewProduct: boolean;

    timerTiny: any;

    howdyAlert: boolean;
    howdyAlertMsg: string;
    howdyAlertType: string;

    constructor(public af: AngularFire,
                public loginUser: LoginComponent,
                public router: Router) {
        //check user credentials
        if(this.loginUser.user == null)
            this.router.navigate(['/login']);

        this.fbCategories = af.database.object('/Gadgetz/Categories');
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        /*jQuery("#ddCategory").on('click', 'li a', function () {
            jQuery("#btnCategory.btn:first-child").text(jQuery(this).text());
            jQuery("#btnCategory.btn:first-child").val(jQuery(this).text());
        });

        jQuery("#ddBrand").on('click', 'li a', function () {
            jQuery("#btnBrand.btn:first-child").text(jQuery(this).text());
            jQuery("#btnBrand.btn:first-child").val(jQuery(this).text());
        });*/
    }

    howdyLogout() {
        this.loginUser.logoutUser();
    }
    selectCategory(name: string) {
        this.selectedCategory = name;
        this.selectedBrand = null;
        this.selectedBrandId = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = false;

        var query: string = "/Gadgetz/" + this.selectedCategory + '/Brands';
        console.log(query);
        this.fbCategoriesBrands = this.af.database.object(query);
    }

    selectBrand(index: number, name: string) {
        this.selectedBrand = name;
        this.selectedBrandId = index;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = false;

        var query: string = "/Gadgetz/" + this.selectedCategory + '/Brands/' + index + '/Products';
        console.log(query);
        this.fbProducts = this.af.database.list(query).map((_products) => {
            return _products.map((_product) => {
                return _product;
            })
        })
    }

    selectProduct(index: number, name: string) {
        this.selectedProduct = name;
        this.selectedProductId = index;
        this.addNewProduct = false;

        var query: string = "/Gadgetz/" + this.selectedCategory + '/Brands/' + this.selectedBrandId + '/Products/' + index;
        console.log(query);
        this.fbProductDetails = this.af.database.object(query);
    }

    newProduct() {
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = true;

        this.fbProductDetails = null;
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
        console.log("content = " + content);
        tinymce.activeEditor.setContent(content);
        clearTimeout(this.timerTiny);
    }

    addProduct(name: string, desc: string, imgUrl: string, details: string, mrp: string, price: string) {
        var data: Object;
        details = tinymce.activeEditor.getContent();
        data = {
            'Name': name,
            'Description': desc,
            'ImageLink': imgUrl,
            'Details': details,
            'MRP': mrp,
            'Price': price
        }
        var query: string = "/Gadgetz/" + this.selectedCategory + '/Brands/' + this.selectedBrandId + '/Products';
        console.log(query);
        this.howdyalert('info','Processing.', true);
        this.fbNewProduct = this.af.database.list(query);
        const promise = this.fbNewProduct.push(data);
        promise
            .then(_ => this.howdyalert('success','New product added successfully.', true))
            .catch(err => this.howdyalert('warning','Error occurred while addding product.', true));
    }

    updateProduct(name: string, desc: string, imgUrl: string, details: string, mrp: string, price: string) {
        var data: Object;
        details = tinymce.activeEditor.getContent();
        data = {
            'Name': name,
            'Description': desc,
            'ImageLink': imgUrl,
            'Details': details,
            'MRP': mrp,
            'Price': price
        }
        this.howdyalert('info','Processing.', true);
        const promise = this.fbProductDetails.update(data);
        promise
            .then(_ => this.howdyalert('success', 'Product updated successfully.', true))
            .catch(err => this.howdyalert('warning','Error occurred while update.', true));
    }

    deleteProduct() {
        this.howdyalert('info','Processing.', true);
        const promise = this.fbProductDetails.remove();
        promise
            .then(_ => this.howdyalert('success', 'Product deleted successfully.', true))
            .catch(err => this.howdyalert('warning','Error occurred while delete.', true));
    }

    howdyalert(type, msg, status) {
        this.howdyAlertType = type;
        this.howdyAlertMsg = msg;
        this.howdyAlert = status;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = false;
    }

    closeAlert() {
        this.howdyAlert = false;
    }
}

