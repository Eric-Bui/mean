import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { from } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  login: FormGroup;

  ngOnInit() {
    this.validateLogin();
  }

  validateLogin() {
    this.login = this.formBuilder.group({
      username: [
        "",
        [Validators.required, Validators.email, Validators.maxLength(75)],
      ],
      password: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  onLogin() {
    const username = this.login.value.username;
    const password = this.login.value.password;

    $("#btn_login").children("#first").hide();
    $("#btn_login").children("#last").show();

    if (this.login.valid) {
      this.adminService.onLogin(username, password).subscribe((data) => {
        this.user = data;
        if (this.user.err) {
          $(".login-error").addClass("error");
          $("#btn_login").children("#first").show();
          $("#btn_login").children("#last").hide();
          setTimeout(function () {
            $(".login-error").removeClass("error");
          }, 5000);
        } else {
          $("#btn_login").children("#first").show();
          $("#btn_login").children("#last").hide();

          console.log(this.user);
          const id = this.user.token;
          localStorage.setItem("id_admin", JSON.stringify(id));

          $(".login-success").addClass("success");
          $(".form-entry").fadeOut();
          setTimeout(function () {
            $(".alert-login__success").fadeIn();
          }, 1000);
          setTimeout(() => {
            this.router.navigate(["/admin/home"]);
          }, 2000);
        }
      });
    }
  }
}
