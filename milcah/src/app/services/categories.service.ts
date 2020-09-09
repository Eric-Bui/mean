import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Categories } from "../model/categories.class";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders().set("Content-Type", "x-www-form-urlencoded"),
};

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  API: string = "/api/categories";

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.API, httpOptions);
  }

  getCategoriesById(id: String): Observable<Categories[]> {
    const url = `${this.API}/${id}`;
    return this.http.get<Categories[]>(url, httpOptions);
  }
}
