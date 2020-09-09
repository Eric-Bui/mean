import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../../services/cart.service";
import { SubjectService } from "../../../../services/subject.service";
import { Product } from "../../../../model/product.class";
import { Categories } from "../../../../model/categories.class";
import { CategoriesService } from "../../../../services/categories.service";
import { Cart } from "../../../../model/cart.class";
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";
import * as bootstrap from "bootstrap";

//signup
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { from } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  categories: Categories[];
  cartItems: any = {};
  user: any;

  member: any;
  err: number = 0;
  message_err: any;

  registered = false;
  submitted = false;
  userRegister: FormGroup;
  userLogin: FormGroup;

  constructor(
    private subjectService: SubjectService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.handleSubscriptionCart();
    this.handleSubcriptionUser();

    this.loadCartItems();
    this.getCategories();

    this.checkLoginInput();
    this.checkRegister();

    this.checkLogin();
  }

  handleSubscriptionCart() {
    this.subjectService.getMsg().subscribe((items: Product) => {
      this.loadCartItems();
    });
  }

  handleSubcriptionUser() {
    this.subjectService.getMsg().subscribe((user: any) => {
      this.checkLogin();
    });
  }

  loadCartItems() {
    this.cartService.getCart().subscribe((items: Cart[]) => {
      this.cartItems = items;
    });
  }

  //remove item from cart
  removeItem(productId) {
    this.cartService.removeCart(productId).subscribe((item) => {
      this.subjectService.sendMsg(item);
    });
  }

  //update cart
  updateCat(productId, qty) {
    this.cartService.updateCart(productId, qty).subscribe((item) => {
      this.subjectService.sendMsg(item);
    });
  }

  // get categories
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  //check input login value form

  checkLoginInput() {
    this.userLogin = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(75)],
      ],
      password: ["", Validators.required],
    });
  }

  //check input register value form
  checkRegister() {
    this.userRegister = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(75)],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          // Validators.pattern(
          // 	"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
          // ),
        ],
      ],
      cpassword: ["", [Validators.required]],
    });
  }

  //validate sign up

  invalidEmail() {
    return this.submitted && this.userRegister.controls.email.errors != null;
  }

  invalidPassword() {
    return this.submitted && this.userRegister.controls.password.errors != null;
  }

  invalidCPassword() {
    return (
      this.submitted &&
      this.userRegister.controls.cpassword.value !=
        this.userRegister.controls.password.value
    );
  }

  //
  onLogin() {
    const username = this.userLogin.controls.email.value;
    const password = this.userLogin.controls.password.value;
    if (this.userLogin.valid) {
      this.auth.onLogin(username, password).subscribe((data) => {
        //set data to Json
        const user = JSON.parse(data as any);
        if (user.email) {
          this.user = user;

          //save user to localstorage
          const index = user.email.indexOf("@");
          const displayName = user.email.slice(0, index);
          const idUser = user._id;
          const userSession = { name: displayName, id: idUser };
          localStorage.setItem("user", JSON.stringify(userSession));
          this.subjectService.sendMsg(user);

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
        } else {
          this.message_err = user;

          $(".alert-login-error").addClass("login-error");
          setTimeout(function () {
            $(".alert-login-error").removeClass("login-error");
          }, 5000);
        }
      });
    }
  }

  checkLogin() {
    if (localStorage.getItem("user")) {
      this.member = JSON.parse(localStorage.getItem("user"));
    }
  }

  logout() {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      //this.router.navigate(["/"]);
      this.auth.logout().subscribe((data) => {
        console.log(data);
        window.location.href = "/";
      });
    }
  }

  //
  onRegister() {
    const email = this.userRegister.controls.email.value;
    const password = this.userRegister.controls.password.value;

    this.submitted = true;
    if (this.userRegister.invalid) {
      return;
    } else {
      this.auth.onRegister(email, password).subscribe(async (data) => {
        const user = JSON.parse(data as any);

        if (user.err) {
          this.message_err = user;
          $(".alert-login-error").addClass("login-error");
          setTimeout(function () {
            $(".alert-login-error").removeClass("login-error");
          }, 5000);
        } else {
          this.user = user;
          //save user to localstorage
          const index = await user.email.indexOf("@");
          const displayName = user.email.slice(0, index);
          const idUser = user._id;
          const userSession = { name: displayName, id: idUser };
          localStorage.setItem("user", JSON.stringify(userSession));
          this.subjectService.sendMsg(user);

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
  }
}
