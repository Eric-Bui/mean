import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-resetpw",
  templateUrl: "./resetpw.component.html",
  styleUrls: ["./resetpw.component.scss"],
})
export class ResetpwComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  resetpw: FormGroup;
  token: string;
  submitted = false;
  user: any;

  ngOnInit() {
    this.validate();
    this.getTokent();
  }

  validate() {
    this.resetpw = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(5)]],
      cpassword: ["", [Validators.required]],
    });
  }

  invalidPassword() {
    return this.submitted && this.resetpw.controls.password.errors != null;
  }

  invalidCPassword() {
    return (
      this.submitted &&
      this.resetpw.controls.cpassword.value !=
        this.resetpw.controls.password.value
    );
  }

  getTokent() {
    this.activatedRoute.params.subscribe((data) => {
      this.token = data.token;
    });
  }

  resetPassword() {
    const password = this.resetpw.controls.password.value;
    this.submitted = true;
    if (this.resetpw.invalid) {
      return;
    } else {
      $("#forgotpw").html("Đang xử lý...");
      this.authService.resetPassword(this.token, password).subscribe((data) => {
        this.user = data;
        console.log(this.user);
        if (this.user.err) {
          $("#forgotpw").html("GỬI");
          $(".show-notification").show();
          $(".alert-resetpw-error").addClass("reset");
          setTimeout(function () {
            $(".alert-resetpw-error").removeClass("reset");
          }, 4000);
          setTimeout(function () {
            $(".show-notification").hide();
          }, 5000);
        } else {
          $("#forgotpw").html("Đang xử lý...");
          $("#reset_entry").fadeOut();
          setTimeout(function () {
            $("#reset_success").fadeIn();
          }, 400);
          let seccond = 3;
          let timer = setInterval(function () {
            $("#countdown").text(seccond--);
            if (seccond < 0) {
              window.location.href = "/";
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    }
  }
}
