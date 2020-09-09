import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  member: any;
  discountMember: Number;

  info: any;
  order: any;
  shipping: Number;
  total: Number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getInfoTracsaction();
  }

  getInfoTracsaction() {
    this.activatedRoute.params.subscribe((data) => {
      const orderId = data.id;
      this.adminService.getTransactionbyId(orderId).subscribe(async (data) => {
        this.info = await data;
      });
      this.adminService.getOrderById(orderId).subscribe((product) => {
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
