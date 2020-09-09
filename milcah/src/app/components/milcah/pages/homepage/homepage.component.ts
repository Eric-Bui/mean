import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../../services/products.service";
import { CartService } from "../../../../services/cart.service";
import { Product } from "../../../../model/product.class";
import { SubjectService } from "../../../../services/subject.service";
import * as bootstrap from "bootstrap";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"],
})
export class HomepageComponent implements OnInit {
  product: Product[];
  qty: number = 1;

  constructor(
    private producstService: ProductsService,
    private cartService: CartService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.producstService.getProducts().subscribe((product) => {
      this.product = product;
    });
  }
  //add item to cart
  addToCart(idProduct) {
    this.cartService.addToCart(idProduct, this.qty).subscribe((cart) => {
      this.subjectService.sendMsg(cart);
      //open modal
      $("#modal_cart").modal("show");
    });
  }
}
