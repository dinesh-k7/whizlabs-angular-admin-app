import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "~utils/shared.module";
import { MaterialComponentsModule } from "~utils/material.module";
import { ProjectDataComponent } from "./project-data.component";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { ProjectListComponent } from "./components/project-list/project-list.component";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { EditProjectComponent } from "./components/edit-project/edit-project.component";

@NgModule({
  declarations: [
    AddProjectComponent,
    EditProjectComponent,
    ProjectDataComponent,
    DynamicFormComponent,
    ProjectListComponent,
  ],
  imports: [
    SharedModule,
    MaterialComponentsModule,
    RouterModule.forChild([{ path: "", component: ProjectDataComponent }]),
  ],
  exports: [RouterModule],
})
export class ProjectDataModule {}
