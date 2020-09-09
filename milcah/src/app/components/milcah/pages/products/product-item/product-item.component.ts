import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../../../../model/product.class";
import { CartService } from "../../../../../services/cart.service";
import { SubjectService } from "../../../../../services/subject.service";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: any;
  qty: number = 1;

  constructor(
    private subjectService: SubjectService,
    private cartService: CartService
  ) {}

  ngOnInit() {}

  addToCart() {
    this.cartService
      .addToCart(this.productItem._id, this.qty)
      .subscribe((cart) => {
        this.subjectService.sendMsg(cart);
        //open modal
        $("#modal_cart").modal("show");
      });
  }
}
