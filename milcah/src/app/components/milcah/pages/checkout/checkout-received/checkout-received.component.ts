import { Component, OnInit } from "@angular/core";
import { TransactionService } from "../../../../../services/transaction.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../../../../../services/cart.service";
import { SubjectService } from "../../../../../services/subject.service";

@Component({
  selector: "app-checkout-received",
  templateUrl: "./checkout-received.component.html",
  styleUrls: ["./checkout-received.component.scss"],
})
export class CheckoutReceivedComponent implements OnInit {
  member: any;
  discountMember: Number;

  info: any;
  order: any;
  shipping: Number;
  total: Number;

  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.handleSubcriptionUser();
    this.checkLogin();
    this.getInfoTracsaction();
  }

  handleSubcriptionUser() {
    this.subjectService.getMsg().subscribe((user: any) => {
      this.checkLogin();
    });
  }

  checkLogin() {
    if (localStorage.getItem("user")) {
      this.member = localStorage.getItem("user");
    }
  }

  loadCart() {
    this.cartService.getCart().subscribe((item) => {
      this.subjectService.sendMsg(item);
    });
  }

  getInfoTracsaction() {
    this.activatedRoute.params.subscribe((data) => {
      const orderId = data.id;
      this.transactionService
        .getResultCheckout(orderId)
        .subscribe(async (data) => {
          this.info = await data;
          this.loadCart();
        });
      this.transactionService.getResultOrder(orderId).subscribe((product) => {
        this.order = product;
        if (this.member) {
          this.discountMember = Math.ceil(
            this.order.totalPrice - this.order.totalPrice * 0.97
          );
        } else {
          this.discountMember = 0;
        }
        if (this.order.totalPrice > 500000) {
          this.shipping = 0;
        } else {
          this.shipping = 50000;
        }
        this.total =
          this.shipping + this.order.totalPrice - +this.discountMember;
      });
    });
  }
}
