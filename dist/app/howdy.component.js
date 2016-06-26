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
var angularfire2_1 = require('angularfire2');
var router_1 = require('@angular/router');
var login_component_1 = require('./login.component');
var HowdyComponent = (function () {
    function HowdyComponent(af, loginUser, router) {
        this.af = af;
        this.loginUser = loginUser;
        this.router = router;
        //check user credentials
        if (this.loginUser.user == null)
            this.router.navigate(['/login']);
        this.fbCategories = af.database.object('/Gadgetz/Categories');
    }
    HowdyComponent.prototype.ngOnInit = function () {
    };
    HowdyComponent.prototype.ngAfterViewInit = function () {
        /*jQuery("#ddCategory").on('click', 'li a', function () {
            jQuery("#btnCategory.btn:first-child").text(jQuery(this).text());
            jQuery("#btnCategory.btn:first-child").val(jQuery(this).text());
        });

        jQuery("#ddBrand").on('click', 'li a', function () {
            jQuery("#btnBrand.btn:first-child").text(jQuery(this).text());
            jQuery("#btnBrand.btn:first-child").val(jQuery(this).text());
        });*/
    };
    HowdyComponent.prototype.howdyLogout = function () {
        this.loginUser.logoutUser();
    };
    HowdyComponent.prototype.selectCategory = function (name) {
        this.selectedCategory = name;
        this.selectedBrand = null;
        this.selectedBrandId = null;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = false;
        var query = "/Gadgetz/" + this.selectedCategory + '/Brands';
        console.log(query);
        this.fbCategoriesBrands = this.af.database.object(query);
    };
    HowdyComponent.prototype.selectBrand = function (index, name) {
        this.selectedBrand = name;
        this.selectedBrandId = index;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = false;
        var query = "/Gadgetz/" + this.selectedCategory + '/Brands/' + index + '/Products';
        console.log(query);
        this.fbProducts = this.af.database.list(query).map(function (_products) {
            return _products.map(function (_product) {
                return _product;
            });
        });
    };
    HowdyComponent.prototype.selectProduct = function (index, name) {
        this.selectedProduct = name;
        this.selectedProductId = index;
        this.addNewProduct = false;
        var query = "/Gadgetz/" + this.selectedCategory + '/Brands/' + this.selectedBrandId + '/Products/' + index;
        console.log(query);
        this.fbProductDetails = this.af.database.object(query);
    };
    HowdyComponent.prototype.newProduct = function () {
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = true;
        this.fbProductDetails = null;
    };
    HowdyComponent.prototype.loadTinyMCE = function (details) {
        var _this = this;
        tinymce.init({
            selector: "[tinyMCE]",
            menubar: false,
            toolbar1: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify styleselect bullist numlist outdent indent blockquote undo redo removeformat subscript superscript",
        });
        if (tinymce.activeEditor.getContent() == "") {
            clearTimeout(this.timerTiny);
            this.timerTiny = setTimeout(function () { return _this.tinyMCESetContent(details); }, 1000);
        }
        return details;
    };
    HowdyComponent.prototype.tinyMCESetContent = function (content) {
        console.log("content = " + content);
        tinymce.activeEditor.setContent(content);
        clearTimeout(this.timerTiny);
    };
    HowdyComponent.prototype.addProduct = function (name, desc, imgUrl, details, mrp, price) {
        var _this = this;
        var data;
        details = tinymce.activeEditor.getContent();
        data = {
            'Name': name,
            'Description': desc,
            'ImageLink': imgUrl,
            'Details': details,
            'MRP': mrp,
            'Price': price
        };
        var query = "/Gadgetz/" + this.selectedCategory + '/Brands/' + this.selectedBrandId + '/Products';
        console.log(query);
        this.howdyalert('info', 'Processing.', true);
        this.fbNewProduct = this.af.database.list(query);
        var promise = this.fbNewProduct.push(data);
        promise
            .then(function (_) { return _this.howdyalert('success', 'New product added successfully.', true); })
            .catch(function (err) { return _this.howdyalert('warning', 'Error occurred while addding product.', true); });
    };
    HowdyComponent.prototype.updateProduct = function (name, desc, imgUrl, details, mrp, price) {
        var _this = this;
        var data;
        details = tinymce.activeEditor.getContent();
        data = {
            'Name': name,
            'Description': desc,
            'ImageLink': imgUrl,
            'Details': details,
            'MRP': mrp,
            'Price': price
        };
        this.howdyalert('info', 'Processing.', true);
        var promise = this.fbProductDetails.update(data);
        promise
            .then(function (_) { return _this.howdyalert('success', 'Product updated successfully.', true); })
            .catch(function (err) { return _this.howdyalert('warning', 'Error occurred while update.', true); });
    };
    HowdyComponent.prototype.deleteProduct = function () {
        var _this = this;
        this.howdyalert('info', 'Processing.', true);
        var promise = this.fbProductDetails.remove();
        promise
            .then(function (_) { return _this.howdyalert('success', 'Product deleted successfully.', true); })
            .catch(function (err) { return _this.howdyalert('warning', 'Error occurred while delete.', true); });
    };
    HowdyComponent.prototype.howdyalert = function (type, msg, status) {
        this.howdyAlertType = type;
        this.howdyAlertMsg = msg;
        this.howdyAlert = status;
        this.selectedProduct = null;
        this.selectedProductId = null;
        this.addNewProduct = false;
    };
    HowdyComponent.prototype.closeAlert = function () {
        this.howdyAlert = false;
    };
    HowdyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'howdy',
            templateUrl: 'howdy.component.html',
            styleUrls: ['howdy.component.css'],
            providers: [login_component_1.LoginComponent]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, login_component_1.LoginComponent, router_1.Router])
    ], HowdyComponent);
    return HowdyComponent;
}());
exports.HowdyComponent = HowdyComponent;
//# sourceMappingURL=howdy.component.js.map