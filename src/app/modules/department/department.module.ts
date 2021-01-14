import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~utils/shared.module";

import { DepartmentComponent } from "./department.component";
import { AddDepartmentComponent } from "./add-department/add-department.component";
import { EditDepartmentComponent } from "./edit-department/edit-department.component";

@NgModule({
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "", component: DepartmentComponent, pathMatch: "full" },
      { path: "add-department", component: AddDepartmentComponent },
      {
        path: "edit-department/:id",
        component: EditDepartmentComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DepartmentModule {}
