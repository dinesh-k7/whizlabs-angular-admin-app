import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "~utils/shared.module";
import { AdminLayoutComponent } from "./admin-layout.component";
import { UserModule } from "~modules/user/user.module";
import { DepartmentModule } from "~modules/department/department.module";
import { ProjectDataModule } from "~modules/project-data/project-data.module";

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    UserModule,
    DepartmentModule,
    ProjectDataModule,
  ],
  declarations: [AdminLayoutComponent],
  providers: [],
  exports: [],
})
export class AdminLayoutModule {}
