import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { MilcahComponent } from "./components/milcah/milcah.component";
import { LoginComponent } from "./components/admin/pages/login/login.component";
import { AuthGuard } from "./services/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: MilcahComponent,
    children: [
      {
        path: "",
        loadChildren: "./components/milcah/milcah.module#MilcahModule",
      },
    ],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: "./components/admin/admin.module#AdminModule",
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
