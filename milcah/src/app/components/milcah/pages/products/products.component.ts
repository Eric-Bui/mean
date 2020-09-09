import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../../../services/products.service";
import { CategoriesService } from "../../../../services/categories.service";
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

  //panigation
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  //search
  name: String;
  categorySelected: String;
  selected: any;
  selectAll: any;
  search: any;

  constructor(
    private producstService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getAllProducts();
  }

  // get categories
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  //get all products
  getAllProducts() {
    this.producstService.getProducts().subscribe((product) => {
      this.products = product;
      this.itemsPerPage = 16;
      this.currentPage = 1;
      this.totalItems = product.length;
    });
  }

  changeCategory(e) {
    if (this.search) {
      this.selected = this.search.filter((x) => {
        return x.idCat == e;
      });
      this.currentPage = 1;
      this.totalItems = this.selected.length;
    } else {
      this.selected = this.products.filter((x) => {
        return x.idCat == e;
      });
      this.totalItems = this.selected.length;
    }
  }

  changeSearch(name) {
    if (this.selected) {
      this.search = this.selected.filter((x) => {
        return x.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
      });
      this.currentPage = 1;
      this.totalItems = this.search.length;
    } else {
      this.search = this.products.filter((x) => {
        return x.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
      });
      this.totalItems = this.search.length;
    }
  }

  //panigation control
  pageChanged(event) {
    this.currentPage = event;
    window.scroll(0, 0);
  }
}
