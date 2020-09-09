import { Component, OnInit } from "@angular/core";
import { TransactionService } from "../../../../../services/transaction.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../../../../../services/cart.service";
import { SubjectService } from "../../../../../services/subject.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  info: any;

  constructor(
    private transactionService: TransactionService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getResult();
  }

  loadCart() {
    this.cartService.getCart().subscribe((item) => {
      this.subjectService.sendMsg(item);
    });
  }

  getResult() {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.info = data;
      this.transactionService.getResultTransaction(data).subscribe((info) => {
        this.loadCart();
      });
    });
  }
}
