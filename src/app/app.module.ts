import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "~utils/shared.module";

import { AppRoutingModule } from "~app/app.routes";

import { AuthGuard } from "~guards/auth.guard";

// COMPONENTS
import { AppComponent } from "~components/app/app.component";
import { TablesComponent } from "~components/tables/tables.component";
import { NotFoundComponent } from "~components/not-found/not-found.component";
import { ConfirmComponent } from "~components/confirm/confirm.component";

import { AuthService } from "~services/auth.service";
import { UserService } from "~services/user.service";
import { DepartmentService } from "~services/department.service";
import { ProjectDataService } from "~services/project-data.service";
import { DivisionService } from "~services/division.service";
import { DivisionFieldService } from "~services/division-field.service";

import { UserModule } from "~modules/user/user.module";
import { AdminLayoutModule } from "~modules/admin-layout/admin-layout.module";
import { LoginLayoutModule } from "~modules/login-layout/login-layout.module";
import { ProjectDataModule } from "~modules/project-data/project-data.module";
import { DepartmentModule } from "~modules/department/department.module";

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    NotFoundComponent,
    ConfirmComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AdminLayoutModule,
    LoginLayoutModule,
    UserModule,
    ProjectDataModule,
    DepartmentModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    UserService,
    DepartmentService,
    ProjectDataService,
    DivisionService,
    DivisionFieldService,
  ],
  entryComponents: [ConfirmComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
