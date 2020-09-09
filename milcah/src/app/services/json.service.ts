import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class JsonService {
  API_LOCAL = "../../assets/json/local.json";
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get(this.API_LOCAL);
  }
}
