import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminRoutes } from "./admin.routing";
import { GlobalModule } from "../../global/global.module";

import { AdminService } from "./services/admin.service";
import { NgxPaginationModule } from "ngx-pagination";

import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { AddComponent } from "./pages/products/add/add.component";
import { EditComponent } from "./pages/products/edit/edit.component";
import { CategoryComponent } from "./pages/category/category.component";
import { OrderComponent } from "./pages/order/order.component";
import { TransactionComponent } from "./pages/transaction/transaction.component";

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AddComponent,
    EditComponent,
    CategoryComponent,
    OrderComponent,
    TransactionComponent,
  ],
  exports: [SidebarComponent, NavbarComponent, FooterComponent],
  imports: [
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalModule,
    RouterModule.forChild(AdminRoutes),
  ],
  providers: [AdminService],
  bootstrap: [],
})
export class AdminModule {}
