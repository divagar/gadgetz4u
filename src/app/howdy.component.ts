import { Component, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {Observable} from 'rxjs/Observable';

declare var jQuery:any;

@Component({
    moduleId: module.id,
    selector: 'howdy',
    templateUrl: 'howdy.component.html',
    styleUrls: ['howdy.component.css']
})

export class HowdyComponent implements AfterViewInit {
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

    constructor(public af: AngularFire) {
        this.fbCategories = af.database.object('/Gadgetz/Categories');
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

    addProduct(name: string, desc: string, imgUrl: string, details: string, mrp: string, price: string) {
        var data: Object;
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
        this.fbNewProduct = this.af.database.list(query);
        const promise = this.fbNewProduct.push(data);
        promise
        .then(_ => console.log('New product added successfully'))
        .catch(err => console.log(err, 'Error in adding new product!'));
    }

    updateProduct(name: string, desc: string, imgUrl: string, details: string, mrp: string, price: string) {
        var data: Object;
        data = {
            'Name': name,
            'Description': desc,
            'ImageLink': imgUrl,
            'Details': details,
            'MRP': mrp,
            'Price': price
        }
        const promise = this.fbProductDetails.update(data);
        promise
        .then(_ => console.log('Updated successfully'))
        .catch(err => console.log(err, 'Error in updating!'));
    }

    deleteProduct() {
        const promise = this.fbProductDetails.remove();
        promise
        .then(_ => console.log('Deleted successfully'))
        .catch(err => console.log(err, 'Error in deleting!'));
    }
}

