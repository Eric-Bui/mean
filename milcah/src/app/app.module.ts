import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AdminModule } from "./components/admin/admin.module";
import { MilcahModule } from "./components/milcah/milcah.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GlobalModule } from "./global/global.module";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./components/admin/admin.component";
import { MilcahComponent } from "./components/milcah/milcah.component";
import { LoginComponent } from "./components/admin/pages/login/login.component";

//service
import { ProductsService } from "./services/products.service";
import { CategoriesService } from "./services/categories.service";
import { CartService } from "./services/cart.service";
import { SubjectService } from "./services/subject.service";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./services/guard/auth.guard";
import { JsonService } from "./services/json.service";
import { TransactionService } from "./services/transaction.service";
import { CustomvalidationService } from "./services/customvalidation.service";

import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [AppComponent, AdminComponent, MilcahComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminModule,
    MilcahModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalModule,
  ],
  providers: [
    ProductsService,
    CategoriesService,
    CartService,
    SubjectService,
    AuthService,
    AuthGuard,
    JsonService,
    TransactionService,
    DatePipe,
    CustomvalidationService,
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
