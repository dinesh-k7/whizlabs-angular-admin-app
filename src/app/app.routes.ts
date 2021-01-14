import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// FILTER
import { AuthGuard } from "~guards/auth.guard";

// LAYOUTS
import { AdminLayoutComponent } from "~modules/admin-layout/admin-layout.component";
import { LoginLayoutComponent } from "~modules/login-layout/login-layout.component";

import { NotFoundComponent } from "~utils/index.pages";

// ROUTES
const routes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: "./modules/user/user.module#UserModule",
      },
      {
        path: "department",
        loadChildren: "./modules/department/department.module#DepartmentModule",
      },
      {
        path: "project-data",
        loadChildren:
          "~modules/project-data/project-data.module#ProjectDataModule",
      },
    ],
  },
  {
    path: "",
    component: LoginLayoutComponent,
    children: [
      {
        path: "login",
        loadChildren: "~modules/login-layout/login/login.module#LoginModule",
      },
      { path: "404", component: NotFoundComponent },
      { path: "**", redirectTo: "/404" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
