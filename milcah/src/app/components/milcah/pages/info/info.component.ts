import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { async } from "rxjs/internal/scheduler/async";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent implements OnInit {
  user: any;
  userUpdate: any;
  member: any;
  transaction: any;

  onUpdate: FormGroup;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.checkLogin();
    this.getInfoUser();
    this.validateUpdate();
  }

  checkLogin() {
    if (localStorage.getItem("user")) {
      this.member = JSON.parse(localStorage.getItem("user"));
    }
  }

  validateUpdate() {
    this.onUpdate = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      phone: ["", Validators.required],
    });
  }

  onChangeInfo() {
    const name = this.onUpdate.controls.name.value;
    const address = this.onUpdate.controls.address.value;
    const phone = this.onUpdate.controls.phone.value;

    if (this.onUpdate.valid) {
      this.activatedRoute.params.subscribe((data) => {
        const id = data.id;
        this.authService
          .onUpdate(name, address, phone, id)
          .subscribe((user) => {
            this.userUpdate = JSON.parse(user as any);
            if (this.userUpdate.name) {
              //add class alert login success
              $(".show-notification").show();
              $(".alert-update-success").addClass("updateinfo");

              setTimeout(function () {
                $(".alert-update-success").removeClass("updateinfo");
              }, 4000);
              setTimeout(function () {
                $(".show-notification").hide();
              }, 5000);
            }
          });
      });
    }
  }

  getInfoUser() {
    this.activatedRoute.params.subscribe((data) => {
      const id = data.id;
      this.authService.onInfoUser(id).subscribe(async (info) => {
        this.user = await JSON.parse(info as any);
        this.getInfoOrder();

        this.onUpdate.patchValue({
          name: this.user.name,
          address: this.user.address,
          phone: this.user.phone,
        });
      });
    });
  }

  getInfoOrder() {
    const email = this.user.email;
    this.authService.getInfoOrder(email).subscribe((transaction) => {
      this.transaction = transaction;
    });
  }
}
