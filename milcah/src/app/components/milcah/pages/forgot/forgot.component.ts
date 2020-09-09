import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../services/auth.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
})
export class ForgotComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  forgot: FormGroup;
  user: any;

  ngOnInit() {
    this.validate();
  }

  validate() {
    this.forgot = this.formBuilder.group({
      email: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(75)],
      ],
    });
  }

  forgotPassword() {
    const email = this.forgot.controls.email.value;
    if (this.forgot.valid) {
      $("#forgotpw").html("Đang xử lý...");
      this.authService.forgotPassword(email).subscribe((data) => {
        this.user = data;
        if (this.user.err) {
          $(".show-notification").show();
          $(".alert-forgot-error").addClass("forgot");
          $("#forgotpw").html("GỬI");
          setTimeout(function () {
            $(".alert-forgot-error").removeClass("forgot");
          }, 4000);
          setTimeout(function () {
            $(".show-notification").hide();
          }, 5000);
        } else {
          $("#forgotpw").html("Đang xử lý...");
          $("#forgot_pw").fadeOut();
          setTimeout(function () {
            $("#message_sucess").fadeIn();
          }, 400);
        }
      });
    }
  }
}
