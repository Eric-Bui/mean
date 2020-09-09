import { Component, OnInit } from "@angular/core";
import { CategoriesService } from "./../../../../services/categories.service";
import { AdminService } from "./../../services/admin.service";
import { Router } from "@angular/router";
import { SubjectService } from "../../../../services/subject.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  addCategory: FormGroup;
  categories: any;
  fileToUpload: any = null;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.checkInput();
    this.getCategories();
    this.handleSubscriptionCategory();
  }

  handleSubscriptionCategory() {
    this.subjectService.getMsg().subscribe((items) => {
      this.getCategories();
    });
  }

  // get categories
  getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  checkInput() {
    this.addCategory = this.formBuilder.group({
      name: ["", Validators.required],
      image: ["", Validators.required],
    });
  }

  selectFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addCategory.patchValue({
      image: file,
    });
    this.fileToUpload = event.target.files[0];
    this.addCategory.get("image").updateValueAndValidity();
  }

  upload() {
    const formData: FormData = new FormData();
    formData.append("name", this.addCategory.controls.name.value);
    if (this.fileToUpload) {
      formData.append("image", this.fileToUpload, this.fileToUpload.name);
    }
    if (this.addCategory.valid) {
      $("#create").html("Đang xử lý...");
      this.adminService.createCategory(formData).subscribe((product) => {
        if (product) {
          this.addCategory.reset();
          $("#create").html("Tạo");
          $(".show-notification").show();
          $(".add-product__success").addClass("add");
          setTimeout(function () {
            $(".add-product__success").removeClass("add");
          }, 2000);
          setTimeout(function () {
            $(".show-notification").hide();
          }, 3000);
          this.router.navigate(["/admin/products/add"]);
        }
      });
    }
  }

  delCategory(id) {
    this.adminService.delCategory(id).subscribe((response) => {
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
}
