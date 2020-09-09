import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "../../../../../services/categories.service";
import { AdminService } from "../../../services/admin.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
  categories: any;
  editProduct: FormGroup;
  product: any;
  result: any;

  fileToUpload: any = null;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getProductById();
    this.checkInput();
  }

  // get categories
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  checkInput() {
    this.editProduct = this.formBuilder.group({
      selected: new FormControl(""),
      name: new FormControl(""),
      price_input: new FormControl(""),
      price: new FormControl(""),
      qty: new FormControl(""),
      images: new FormControl(""),
    });
  }

  selectFile(event) {
    $(".old-image").hide();
    const file = (event.target as HTMLInputElement).files;
    this.editProduct.patchValue({
      images: file,
    });
    this.fileToUpload = event.target.files;
    //this.editProduct.get("images").updateValueAndValidity();
  }

  getProductById() {
    this.activatedRoute.params.subscribe((data) => {
      const id = data.id;
      this.adminService.getProductById(id).subscribe((data) => {
        this.product = data;
        this.editProduct.patchValue({
          selected: this.product.idCat,
          name: this.product.name,
          price_input: this.product.price_input,
          price: this.product.price,
          qty: this.product.qty,
          images: this.fileToUpload || this.product.images,
        });
      });
    });
  }

  edit() {
    const formData: FormData = new FormData();
    formData.append("selected", this.editProduct.controls.selected.value);
    formData.append("name", this.editProduct.controls.name.value);
    formData.append("price_input", this.editProduct.controls.price_input.value);
    formData.append("price", this.editProduct.controls.price.value);
    formData.append("qty", this.editProduct.controls.qty.value);
    $("#create").children("#first").hide();
    $("#create").children("#last").show();
    if (this.fileToUpload) {
      for (let i = 0; i < this.fileToUpload.length; i++) {
        formData.append(
          "image",
          this.fileToUpload[i],
          this.fileToUpload[i].name
        );
      }
    } else {
      formData.append("images", this.editProduct.controls.images.value);
    }
    this.adminService
      .editProduct(this.product._id, formData)
      .subscribe((data) => {
        this.result = data;
        if (this.result.result) {
          $("#create").children("#first").show();
          $("#create").children("#last").hide();

          $(".show-notification").show();
          $(".edit-product__success").addClass("update");

          setTimeout(function () {
            $(".edit-product__success").removeClass("update");
          }, 2000);
          setTimeout(function () {
            $(".show-notification").hide();
          }, 3000);
          setTimeout(() => {
            this.router.navigate(["/admin/products"]);
          }, 3500);
        }
      });
  }
}
