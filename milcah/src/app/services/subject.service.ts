import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  subject = new Subject();

  constructor() {}

  sendMsg(product) {
    this.subject.next(product); //Triggering an event
  }
  getMsg() {
    return this.subject.asObservable();
  }

  sendInfo(info) {
    this.subject.next(info);
  }

  getInfo() {
    return this.subject.asObservable();
  }
}
