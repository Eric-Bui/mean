import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "order",
})
export class OrderPipe implements PipeTransform {
  transform(order: any, name: String): any {
    if (!name) {
      return order;
    } else {
      order = order.filter((x) => {
        return x.orderId.indexOf(name) != -1;
      });
    }
    return order;
  }
}
