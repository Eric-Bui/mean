import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MilcahRoutes } from "./milcah.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GlobalModule } from "../../global/global.module";

import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CartComponent } from "./pages/cart/cart.component";
import { ProductItemComponent } from "./pages/products/product-item/product-item.component";
import { CollectionComponent } from "./pages/collection/collection.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { ForgotComponent } from "./pages/forgot/forgot.component";
import { InfoComponent } from "./pages/info/info.component";
import { TransactionComponent } from "./pages/checkout/transaction/transaction.component";
import { CheckoutReceivedComponent } from "./pages/checkout/checkout-received/checkout-received.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { ResetpwComponent } from "./pages/resetpw/resetpw.component";

import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    ProductItemComponent,
    CollectionComponent,
    CheckoutComponent,
    ForgotComponent,
    InfoComponent,
    CheckoutReceivedComponent,
    TransactionComponent,
    ContactComponent,
    ResetpwComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    GlobalModule,
    RouterModule.forChild(MilcahRoutes),
  ],
  exports: [HeaderComponent, FooterComponent],
})
export class MilcahModule {}
