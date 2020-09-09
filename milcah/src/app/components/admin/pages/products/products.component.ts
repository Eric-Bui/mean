import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../../services/products.service";
import { CategoriesService } from "../../../../services/categories.service";
import { AdminService } from "../../services/admin.service";
import { SubjectService } from "../../../../services/subject.service";

import { Product } from "../../../../model/product.class";
import { Categories } from "../../../../model/categories.class";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  categories: Categories[];
  products: any;
  statusProduct: boolean;

  //panigation
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  //search
  name: String;
  categorySelected: String;

  search: any;

  constructor(
    private producstService: ProductsService,
    private categoriesService: CategoriesService,
    private adminService: AdminService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getAllProducts();
    this.handleSubscriptionProduct();
  }

  handleSubscriptionProduct() {
    this.subjectService.getMsg().subscribe((items: Product) => {
      this.getAllProducts();
    });
  }

  // get categories
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  //get all products
  getAllProducts() {
    this.adminService.getProduct().subscribe((products) => {
      this.products = products;
      this.itemsPerPage = 16;
      this.currentPage = 1;
      this.totalItems = this.products.length;
    });
  }

  delProduct(idProduct) {
    this.adminService.delProduct(idProduct).subscribe((response) => {
      this.subjectService.sendMsg(response);
      if (response) {
        $(".show-notification").show();
        $(".remove-product__success").addClass("remove");
        setTimeout(function () {
          $(".remove-product__success").removeClass("remove");
        }, 2000);
        setTimeout(function () {
          $(".show-notification").hide();
        }, 3000);
      }
    });
  }

  changeStatus(status, id) {
    if (status == 1) {
      this.statusProduct = true;
    } else {
      this.statusProduct = false;
    }
    console.log(this.statusProduct, id);
    this.adminService
      .changeStatusProduct(this.statusProduct, id)
      .subscribe((data) => {
        if (data) {
          this.subjectService.sendMsg(data);
          $(".show-notification").show();
          $(".edit-order__success").addClass("edit");
          setTimeout(function () {
            $(".edit-order__success").removeClass("edit");
          }, 3000);
          setTimeout(function () {
            $(".show-notification").hide();
          }, 4000);
        }
      });
  }

  changeSearch(name) {
    this.search = this.products.filter((x) => {
      return x.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    });
    this.totalItems = this.search.length;
    this.itemsPerPage = 16;
    this.currentPage = 1;
  }

  //panigation control
  pageChanged(event) {
    window.scroll(0, 0);
    this.currentPage = event;
  }
}
