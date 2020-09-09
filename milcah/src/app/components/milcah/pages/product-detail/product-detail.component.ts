import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../../services/products.service";
import { CartService } from "../../../../services/cart.service";
import { SubjectService } from "../../../../services/subject.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  arrProduct: any;
  quantity: number = 1;

  constructor(
    private producstService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProductById();
  }

  //add item to cart
  addToCart(idProduct, qty) {
    this.cartService.addToCart(idProduct, qty).subscribe((cart) => {
      this.subjectService.sendMsg(cart);
      //open modal
      $("#modal_cart").modal("show");
    });
  }

  //get product by ID
  getProductById() {
    this.activatedRoute.params.subscribe((data) => {
      const id = data.id;
      this.producstService.getProductById(id).subscribe((data: any) => {
        this.product = data.product;
        this.arrProduct = data.arrProduct.slice(1, 9);
      });
    });
  }

  //quantity product
  minus() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }
  push() {
    this.quantity = this.quantity + 1;
  }
}
