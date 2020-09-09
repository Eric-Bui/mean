import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
//import { Product } from "../../model/product.class";

const options = {
  headers: new HttpHeaders({ Accept: "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class AdminService {
  API: string = "api/admin/";

  isSidebarPinned = false;
  isSidebarToggeled = false;

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get(this.API + "product");
  }

  getProductById(id) {
    return this.http.get(this.API + `product/${id}`);
  }

  createProduct(data) {
    return this.http.post(this.API + "addproduct", data);
  }

  changeStatusProduct(status, id) {
    const data = { status };
    return this.http.post(this.API + `product/edit/${id}`, data, options);
  }

  editProduct(id, data) {
    return this.http.post(this.API + `edit/${id}`, data);
  }

  delProduct(id) {
    return this.http.get(this.API + `delproduct/${id}`);
  }

  //categories

  createCategory(data) {
    return this.http.post(this.API + "category", data);
  }

  delCategory(id) {
    return this.http.get(this.API + `delcategory/${id}`);
  }

  // danh sach don hang
  getOrder() {
    return this.http.get(this.API + "order");
  }

  getOrderById(orderId) {
    return this.http.get(this.API + `order/${orderId}`);
  }

  editOrder(status, id) {
    const data = { status };
    return this.http.post(this.API + `order/edit/${id}`, data, options);
  }

  deleteOrder(id) {
    return this.http.post(this.API + `order/delete/${id}`, options);
  }

  //danh sach giao dich
  getTransactionbyId(orderId) {
    return this.http.get(this.API + `transaction/${orderId}`);
  }

  //authentication
  onLogin(username, password) {
    return this.http.post(this.API + "login", { username, password });
  }

  //logout
  logout() {
    return this.http.get(this.API + "logout");
  }

  //
  toggleSidebar() {
    this.isSidebarToggeled = !this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = !this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled,
    };
  }
}
