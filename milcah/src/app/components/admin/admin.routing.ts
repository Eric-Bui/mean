import { Routes } from "@angular/router";

import { HomeComponent } from "./pages/home/home.component";
import { ProductsComponent } from "./pages/products/products.component";
import { AddComponent } from "./pages/products/add/add.component";
import { EditComponent } from "./pages/products/edit/edit.component";
import { CategoryComponent } from "./pages/category/category.component";
import { OrderComponent } from "./pages/order/order.component";
import { TransactionComponent } from "./pages/transaction/transaction.component";

export const AdminRoutes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "products",
    children: [
      {
        path: "",
        component: ProductsComponent,
      },
      {
        path: "add",
        component: AddComponent,
      },
      {
        path: "edit/:id",
        component: EditComponent,
      },
    ],
  },
  {
    path: "category",
    children: [
      {
        path: "add",
        component: CategoryComponent,
      },
    ],
  },
  {
    path: "order",
    component: OrderComponent,
  },
  {
    path: "transaction/:id",
    component: TransactionComponent,
  },
];
