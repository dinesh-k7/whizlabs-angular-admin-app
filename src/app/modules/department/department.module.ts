import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~utils/shared.module";

import { DepartmentComponent } from "./department.component";
import { AddDepartmentComponent } from "./components/add-department/add-department.component";
import { EditDepartmentComponent } from "./components/edit-department/edit-department.component";
import { DivisionComponent } from "./components/division/division.component";
import { DivisionFieldComponent } from './components/division-field/division-field.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { DivisionDetailsComponent } from './components/division-details/division-details.component';

@NgModule({
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    DivisionComponent,
    DivisionFieldComponent,
    ModalFormComponent,
    DivisionDetailsComponent,
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
