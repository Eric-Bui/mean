import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterPipe } from "./../pipes/filter.pipe";
import { FormDirective } from "./../directive/form.directive";
import { OrderPipe } from "./../pipes/order.pipe";

@NgModule({
  declarations: [FilterPipe, FormDirective, OrderPipe],
  imports: [CommonModule],
  exports: [FilterPipe, FormDirective, OrderPipe],
})
export class GlobalModule {}
