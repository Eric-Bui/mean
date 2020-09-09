import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "../../../../../services/categories.service";
import { AdminService } from "../../../services/admin.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  categories: any;
  price: number;

  addProduct: FormGroup;
  fileToUpload: any = null;
  product: any;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.checkInput();
  }

  // get categories
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  checkInput() {
    this.addProduct = this.formBuilder.group({
      selected: ["", Validators.required],
      name: ["", Validators.required],
      price_input: ["", Validators.required],
      price: ["", Validators.required],
      qty: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  selectFile(event) {
    const file = (event.target as HTMLInputElement).files;
    this.addProduct.patchValue({
      image: file,
    });
    this.fileToUpload = event.target.files;
    this.addProduct.get("image").updateValueAndValidity();
  }

  upload() {
    const formData: FormData = new FormData();
    formData.append("selected", this.addProduct.controls.selected.value);
    formData.append("name", this.addProduct.controls.name.value);
    formData.append("price_input", this.addProduct.controls.price_input.value);
    formData.append("price", this.addProduct.controls.price.value);
    formData.append("qty", this.addProduct.controls.qty.value);
    if (this.fileToUpload) {
      for (let i = 0; i < this.fileToUpload.length; i++) {
        formData.append(
          "image",
          this.fileToUpload[i],
          this.fileToUpload[i].name
        );
      }
    }
    if (this.addProduct.valid) {
      $("#create").children("#first").hide();
      $("#create").children("#last").show();
      this.adminService.createProduct(formData).subscribe((product) => {
        const data = product as any;
        if (data.name) {
          this.addProduct.reset();
          $("#create")
            .closest(".text-center")
            .prev(".group-review")
            .children(".preview-images")
            .empty();

          $("#create").children("#first").show();
          $("#create").children("#last").hide();

          $(".show-notification").show();
          $(".add-product__success").addClass("add");

          setTimeout(function () {
            $(".add-product__success").removeClass("add");
          }, 2000);
          setTimeout(function () {
            $(".show-notification").hide();
          }, 3000);
        }
      });
    }
  }
}
