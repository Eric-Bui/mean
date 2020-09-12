import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Transaction } from "../model/transaction.class";
import { Observable } from "rxjs";

const options = { responseType: "text" as "json" };

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  API: string = "api/transaction/create_payment";
  API_RESULT: string = "/api/transaction/transaction";
  API_TRANSACTION: string = "/api/transaction";
  API_ORDER: string = "/api/transaction/order";

  constructor(private http: HttpClient) {}

  onCheckout(
    name,
    email,
    phone,
    address,
    description,
    payment_method,
    createDate,
    discount,
    feeship,
    amount
  ) {
    return this.http.post<Transaction>(
      this.API,
      {
        name,
        email,
        phone,
        address,
        description,
        payment_method,
        createDate,
        discount,
        feeship,
        amount,
      },
      options
    );
  }

  getResultTransaction(query: any) {
    return this.http.post<any>(this.API_TRANSACTION, {
      params: { query },
      observe: "response",
    });
  }

  getResultCheckout(orderId) {
    const url = `${this.API_RESULT}/${orderId}`;
    return this.http.get<Transaction>(url);
  }

  getResultOrder(orderId) {
    const url = `${this.API_ORDER}/${orderId}`;
    return this.http.get<Transaction>(url);
  }
}
