import { Component, OnInit } from "@angular/core";
import { AdminService } from "./services/admin.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  constructor(private appService: AdminService) {}

  getClasses() {
    const classes = {
      "pinned-sidebar": this.appService.getSidebarStat().isSidebarPinned,
      "toggeled-sidebar": this.appService.getSidebarStat().isSidebarToggeled,
    };
    return classes;
  }
  toggleSidebar() {
    this.appService.toggleSidebar();
  }

  ngOnInit() {}
}
