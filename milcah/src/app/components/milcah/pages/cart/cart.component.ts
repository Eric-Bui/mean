import { Component, OnInit } from "@angular/core";
import { Cart } from "../../../../model/cart.class";
import { Product } from "../../../../model/product.class";
import { CartService } from "../../../../services/cart.service";
import { SubjectService } from "../../../../services/subject.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartItems: any;

  constructor(
    private cartService: CartService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.handleSubscriptionCart();
  }

  handleSubscriptionCart() {
    this.subjectService.getMsg().subscribe((items: Product) => {
      this.loadCartItems();
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
      //add class alert login success
      $(".show-notification").show();
      $(".alert-removed").addClass("removed");

      setTimeout(function () {
        $(".alert-removed").removeClass("removed");
      }, 4000);
      setTimeout(function () {
        $(".show-notification").hide();
      }, 5000);
    });
  }

  //update cart
  updateCat(productId, qty) {
    this.cartService.updateCart(productId, qty).subscribe((item) => {
      this.subjectService.sendMsg(item);
      //add class alert login success
      $(".show-notification").show();
      $(".alert-updated").addClass("updated");

      setTimeout(function () {
        $(".alert-updated").removeClass("updated");
      }, 4000);
      setTimeout(function () {
        $(".show-notification").hide();
      }, 5000);
    });
  }
}
