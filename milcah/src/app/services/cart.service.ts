import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cart } from "../model/cart.class";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders().set("Content-Type", "x-www-form-urlencoded"),
};

@Injectable({
  providedIn: "root",
})
export class CartService {
  API: string = "/api/cart";
  API_ADD_CART: String = "/api/cart/add";
  API_DEL_CART: String = "/api/cart/delete";
  API_UPDATE_CART: String = "/api/cart/update";

  constructor(private http: HttpClient) {}

  //get data add to cart
  getCart() {
    return this.http.get(this.API, httpOptions);
  }

  //add to cart
  addToCart(productId: String, qty: number): Observable<Cart[]> {
    const url = `${this.API_ADD_CART}/${productId}${qty}`;
    return this.http.post<Cart[]>(url, httpOptions);
  }

  //remove item from cart
  removeCart(productId: String): Observable<Cart[]> {
    const url = `${this.API_DEL_CART}/${productId}`;
    return this.http.post<Cart[]>(url, httpOptions);
  }

  //update item from cart
  updateCart(productId: String, qty: number): Observable<Cart[]> {
    const url = `${this.API_UPDATE_CART}/${productId}${qty}`;
    return this.http.post<Cart[]>(url, httpOptions);
  }
}
