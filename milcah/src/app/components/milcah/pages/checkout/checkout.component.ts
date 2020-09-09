import { Component, OnInit } from "@angular/core";
import { SubjectService } from "../../../../services/subject.service";
import { JsonService } from "../../../../services/json.service";
import { CartService } from "../../../../services/cart.service";
import { TransactionService } from "../../../../services/transaction.service";
import { AuthService } from "../../../../services/auth.service";
import { Cart } from "../../../../model/cart.class";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  member: any;
  cartItems: any;

  cities: any;
  districts: any;
  wards: any;

  discountMember: Number;
  feeShip: Number;
  totalOrder: Number;
  status: Number = 0;

  constructor(
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private jsonService: JsonService,
    private cartService: CartService,
    private datePipe: DatePipe,
    private transactionService: TransactionService,
    private router: Router,
    private authService: AuthService
  ) {}

  userLogin: FormGroup;
  checkout: FormGroup;

  ngOnInit() {
    this.handleSubcriptionUser();
    this.checkLogin();
    this.getCities();
    this.loadCartItems();
    this.checkLogin();
    this.validateCheckout();
  }

  handleSubcriptionUser() {
    this.subjectService.getMsg().subscribe((user: any) => {
      this.checkLogin();
      this.loadCartItems();
    });
  }

  checkLogin() {
    if (localStorage.getItem("user")) {
      this.member = localStorage.getItem("user");
    }
  }

  validateCheckout() {
    this.checkout = this.formBuilder.group({
      name: ["", Validators.required],
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(75)],
      ],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      description: new FormControl(),
      city: ["", [Validators.required, Validators.minLength(1)]],
      district: ["", [Validators.required, Validators.minLength(1)]],
      ward: ["", Validators.required],
      payment_method: ["1", Validators.required],
    });
  }

  onCheckout() {
    const name = this.checkout.controls.name.value;
    const email = this.checkout.controls.email.value;
    const phone = this.checkout.controls.phone.value;
    const street = this.checkout.controls.address.value;
    const city = this.checkout.controls.city.value;
    const district = this.checkout.controls.district.value;
    const ward = this.checkout.controls.ward.value;
    const address = street + "," + ward + ";" + district + "," + city;

    const description = this.checkout.controls.description.value || "";
    const payment_method = this.checkout.controls.payment_method.value;
    const date = new Date();
    const createDate = this.datePipe.transform(date, "dd-MM-yyyy : hh-mm-ss");
    const amount = this.totalOrder;
    if (this.checkout.valid) {
      this.transactionService
        .onCheckout(
          name,
          email,
          phone,
          address,
          description,
          payment_method,
          createDate,
          amount
        )
        .subscribe(async (data) => {
          const url = await JSON.parse(data as any);
          if (payment_method == 3) {
            window.location.href = url.data;
          } else {
            this.router.navigate([
              "/checkout/checkout-received/" + url.orderId,
            ]);
          }
        });
      this.checkout.reset();
    }
  }

  //get data option cities
  getCities() {
    this.jsonService.getCountries().subscribe((data: []) => {
      this.cities = data;
    });
  }

  onchangeCity(cityName) {
    if (cityName) {
      this.districts = this.cities.find((x) => {
        return x.name == cityName;
      });
      this.wards = "";
    } else {
      this.districts = "";
      this.wards = "";
    }
  }
  onchangeDistric(districtName) {
    if (districtName) {
      this.wards = this.districts.districts.find((x) => {
        return x.name == districtName;
      });
    } else {
      this.wards = "";
    }
  }

  loadCartItems() {
    this.cartService.getCart().subscribe((items: Cart[]) => {
      this.cartItems = items;
      if (this.member) {
        this.discountMember = Math.ceil(
          this.cartItems.totalPrice - this.cartItems.totalPrice * 0.97
        );
      } else {
        this.discountMember = 0;
      }
      if (this.cartItems.totalPrice >= 500000) {
        this.feeShip = 0;
      } else {
        this.feeShip = 50000;
      }
      this.totalOrder =
        this.cartItems.totalPrice + this.feeShip - +this.discountMember;
    });
  }
}
