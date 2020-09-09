import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user.class";
import { Observable } from "rxjs";

const options = { responseType: "text" as "json" };

@Injectable({
  providedIn: "root",
})
export class AuthService {
  API: string = "/api/users";

  constructor(private http: HttpClient) {}

  onLogin(email, password): Observable<User[]> {
    const URL_LOGIN = this.API + "/login";
    return this.http.post<User[]>(URL_LOGIN, { email, password }, options);
  }

  onRegister(email, password) {
    const URL_REGISTER = this.API + "/signup";
    return this.http.post<User>(
      URL_REGISTER,
      {
        email,
        password,
      },
      options
    );
  }

  onInfoUser(userId: String) {
    const URL_INFO = this.API + `/profile/${userId}`;
    return this.http.get(URL_INFO, options);
  }

  onUpdate(name, address, phone, userId) {
    const URL_UPDATE = this.API + `/update/${userId}`;
    return this.http.post(
      URL_UPDATE,
      {
        name,
        address,
        phone,
      },
      options
    );
  }

  forgotPassword(email) {
    const URL_FOGOTPW = this.API + `/forgotpw`;
    return this.http.post(URL_FOGOTPW, { email });
  }

  resetPassword(token, password) {
    const URL_RESETPW = this.API + `/resetpw/${token}`;
    return this.http.post(URL_RESETPW, { password });
  }

  getInfoOrder(email) {
    const URL_ORDER = this.API + `/order`;
    return this.http.post(URL_ORDER, { email });
  }

  logout() {
    const URL_LOGOUT = this.API + `/logout`;
    return this.http.get(URL_LOGOUT);
  }
}
