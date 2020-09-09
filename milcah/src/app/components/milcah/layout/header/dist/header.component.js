"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
//signup
var forms_1 = require("@angular/forms");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(subjectService, cartService, formBuilder, categoriesService, auth) {
        this.subjectService = subjectService;
        this.cartService = cartService;
        this.formBuilder = formBuilder;
        this.categoriesService = categoriesService;
        this.auth = auth;
        this.cartItems = {};
        this.err = 0;
        this.registered = false;
        this.submitted = false;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.handleSubscriptionCart();
        this.handleSubcriptionUser();
        this.loadCartItems();
        this.getCategories();
        this.checkLoginInput();
        this.checkRegister();
        this.checkLogin();
    };
    HeaderComponent.prototype.handleSubscriptionCart = function () {
        var _this = this;
        this.subjectService.getMsg().subscribe(function (items) {
            _this.loadCartItems();
        });
    };
    HeaderComponent.prototype.handleSubcriptionUser = function () {
        var _this = this;
        this.subjectService.getMsg().subscribe(function (user) {
            _this.checkLogin();
        });
    };
    HeaderComponent.prototype.loadCartItems = function () {
        var _this = this;
        this.cartService.getCart().subscribe(function (items) {
            _this.cartItems = items;
        });
    };
    //remove item from cart
    HeaderComponent.prototype.removeItem = function (productId) {
        var _this = this;
        this.cartService.removeCart(productId).subscribe(function (item) {
            _this.subjectService.sendMsg(item);
        });
    };
    //update cart
    HeaderComponent.prototype.updateCat = function (productId, qty) {
        var _this = this;
        this.cartService.updateCart(productId, qty).subscribe(function (item) {
            _this.subjectService.sendMsg(item);
        });
    };
    // get categories
    HeaderComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoriesService.getCategories().subscribe(function (categories) {
            _this.categories = categories;
        });
    };
    //check input login value form
    HeaderComponent.prototype.checkLoginInput = function () {
        this.userLogin = this.formBuilder.group({
            email: ["", forms_1.Validators.required],
            password: ["", forms_1.Validators.required]
        });
    };
    //check input register value form
    HeaderComponent.prototype.checkRegister = function () {
        this.userRegister = this.formBuilder.group({
            email: [
                "",
                [forms_1.Validators.required, forms_1.Validators.email, forms_1.Validators.maxLength(75)],
            ],
            password: [
                "",
                [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                ],
            ],
            cpassword: ["", [forms_1.Validators.required]]
        });
    };
    //validate sign up
    HeaderComponent.prototype.invalidEmail = function () {
        return this.submitted && this.userRegister.controls.email.errors != null;
    };
    HeaderComponent.prototype.invalidPassword = function () {
        return this.submitted && this.userRegister.controls.password.errors != null;
    };
    HeaderComponent.prototype.invalidCPassword = function () {
        return (this.submitted &&
            this.userRegister.controls.cpassword.value !=
                this.userRegister.controls.password.value);
    };
    //
    HeaderComponent.prototype.onLogin = function () {
        var _this = this;
        var username = this.userLogin.controls.email.value;
        var password = this.userLogin.controls.password.value;
        if (this.userLogin.valid) {
            this.auth.onLogin(username, password).subscribe(function (data) {
                //set data to Json
                var user = JSON.parse(data);
                if (user.email) {
                    _this.user = user;
                    //save user to localstorage
                    var index = user.email.indexOf("@");
                    var displayName = user.email.slice(0, index);
                    localStorage.setItem("user", displayName);
                    _this.subjectService.sendMsg(user);
                    //close modal
                    $("#modal_login").modal("hide");
                    //add class alert login success
                    $(".show-notification").show();
                    $(".alert-login-success").addClass("logged");
                    setTimeout(function () {
                        $(".alert-login-success").removeClass("logged");
                    }, 4000);
                    setTimeout(function () {
                        $(".show-notification").hide();
                    }, 5000);
                }
                else {
                    _this.message_err = user;
                    $(".alert-login-error").addClass("login-error");
                    setTimeout(function () {
                        $(".alert-login-error").removeClass("login-error");
                    }, 5000);
                }
            });
        }
    };
    HeaderComponent.prototype.checkLogin = function () {
        if (localStorage.getItem("user")) {
            this.member = localStorage.getItem("user");
        }
    };
    HeaderComponent.prototype.logout = function () {
        if (localStorage.getItem("user")) {
            localStorage.removeItem("user");
            window.location.reload();
        }
    };
    //
    HeaderComponent.prototype.onRegister = function () {
        var _this = this;
        var email = this.userRegister.controls.email.value;
        var password = this.userRegister.controls.password.value;
        this.submitted = true;
        if (this.userRegister.invalid) {
            return;
        }
        else {
            this.auth.onRegister(email, password).subscribe(function (data) {
                var user = JSON.parse(data);
                if (user.err) {
                    _this.message_err = user;
                    $(".alert-login-error").addClass("login-error");
                    setTimeout(function () {
                        $(".alert-login-error").removeClass("login-error");
                    }, 5000);
                }
                else {
                    _this.user = user;
                    //save user to localstorage
                    var index = user.email.indexOf("@");
                    var displayName = user.email.slice(0, index);
                    localStorage.setItem("user", displayName);
                    _this.subjectService.sendMsg(user);
                    //close modal
                    $("#modal_login").modal("hide");
                    //add class alert login success
                    $(".show-notification").show();
                    $(".alert-register-success").addClass("registered");
                    setTimeout(function () {
                        $(".alert-register-success").removeClass("registered");
                        $(".show-notification").hide();
                    }, 5000);
                }
            });
            this.registered = true;
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: "app-header",
            templateUrl: "./header.component.html",
            styleUrls: ["./header.component.scss"]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
