import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "../../../../services/categories.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-collection",
  templateUrl: "./collection.component.html",
  styleUrls: ["./collection.component.scss"],
})
export class CollectionComponent implements OnInit {
  products: any;
  name: String;

  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  search: any;

  constructor(
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProductByIdCategory();
  }

  //get product by ID
  getProductByIdCategory() {
    this.activatedRoute.params.subscribe((data) => {
      const id = data.id;
      this.categoriesService.getCategoriesById(id).subscribe((product) => {
        this.products = product;
        this.itemsPerPage = 12;
        this.currentPage = 1;
        this.totalItems = product.length;
        this.search = product.length;
      });
    });
  }

  searchChange(name) {
    this.search = this.products.products.filter((x) => {
      return x.name.toLowerCase().indexOf(name.toLowerCase()) != -1;
    });
  }

  //panigation control
  pageChanged(event) {
    this.currentPage = event;
    window.scroll(0, 0);
  }
}
