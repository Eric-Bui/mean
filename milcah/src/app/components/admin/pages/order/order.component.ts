import { Component, OnInit } from "@angular/core";
import { AdminService } from "./../../services/admin.service";
import { SubjectService } from "../../../../services/subject.service";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  order: any;
  name: string;
  search: any;

  //panigation
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(
    private adminService: AdminService,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getAllOrder();
    this.handleSubscriptionOrder();
  }

  getAllOrder() {
    this.adminService.getOrder().subscribe((order) => {
      this.order = order;
      this.itemsPerPage = 16;
      this.currentPage = 1;
      this.totalItems = this.order.length;
    });
  }

  handleSubscriptionOrder() {
    this.subjectService.getMsg().subscribe((items) => {
      this.getAllOrder();
    });
  }

  changeSearch(name) {
    console.log(name);
    if (name) {
      this.search = this.order.filter((x) => {
        return x.orderId.indexOf(name) != -1;
      });
      this.totalItems = this.search.length;
      this.itemsPerPage = 16;
      this.currentPage = 1;
    } else {
      this.totalItems = this.order.length;
    }
  }

  changeStatus(status, id) {
    this.adminService.editOrder(status, id).subscribe((data) => {
      if (data) {
        this.subjectService.sendMsg(data);
        $(".show-notification").show();
        $(".edit-order__success").addClass("edit");
        setTimeout(function () {
          $(".edit-order__success").removeClass("edit");
        }, 3000);
        setTimeout(function () {
          $(".show-notification").hide();
        }, 4000);
      }
    });
  }

  editOrder(id) {
    $("#" + id)
      .closest(".action")
      .prev(".status")
      .children("select")
      .addClass("active")
      .focus();
  }

  deleteOrder(id) {
    this.adminService.deleteOrder(id).subscribe((order) => {
      console.log(order);
      if (order) {
        this.subjectService.sendMsg(order);
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

  //panigation control
  pageChanged(event) {
    window.scroll(0, 0);
    this.currentPage = event;
  }
}
