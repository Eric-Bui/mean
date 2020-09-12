import { Routes } from "@angular/router";

import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CartComponent } from "./pages/cart/cart.component";
import { CollectionComponent } from "./pages/collection/collection.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { CheckoutReceivedComponent } from "./pages/checkout/checkout-received/checkout-received.component";
import { ForgotComponent } from "./pages/forgot/forgot.component";
import { InfoComponent } from "./pages/info/info.component";
import { TransactionComponent } from "./pages/checkout/transaction/transaction.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { ResetpwComponent } from "./pages/resetpw/resetpw.component";

export const MilcahRoutes: Routes = [
  {
    path: "",
    component: HomepageComponent,
  },
  {
    path: "products",
    children: [
      {
        path: ":id",
        component: ProductDetailComponent,
      },
      {
        path: "",
        component: ProductsComponent,
      },
    ],
  },
  {
    path: "collection/:id",
    component: CollectionComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "checkout",
    children: [
      {
        path: "",
        component: CheckoutComponent,
      },
      {
        path: "checkout-received/:id",
        component: CheckoutReceivedComponent,
      },
      {
        path: "transaction",
        component: TransactionComponent,
      },
    ],
  },
  {
    path: "my-account/:id",
    component: InfoComponent,
  },
  {
    path: "forgotpw",
    component: ForgotComponent,
  },
  {
    path: "resetpw/:token",
    component: ResetpwComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
];
