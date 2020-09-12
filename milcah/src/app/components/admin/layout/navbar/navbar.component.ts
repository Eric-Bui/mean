import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  isCollapsed = true;
  note: any;

  ngOnInit() {
    this.chekCookie();
  }

  logout() {
    if (localStorage.getItem("id_admin")) {
      localStorage.removeItem("id_admin");
      this.router.navigate(["/login"]);
      this.adminService.logout().subscribe(async (data) => {});
    }
  }

  chekCookie() {
    if (!this.cookieService.get("id_admin")) {
      this.logout();
    }
  }

  toggleSidebarPin() {
    this.adminService.toggleSidebarPin();
  }
  toggleSidebar() {
    this.adminService.toggleSidebar();
  }
}
