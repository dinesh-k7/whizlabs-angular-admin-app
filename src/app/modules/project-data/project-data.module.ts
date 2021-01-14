import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~utils/shared.module";
import { MaterialComponentsModule } from "~utils/material.module";

import { ProjectDataComponent } from "./project-data.component";

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MaterialComponentsModule,
    RouterModule.forChild([{ path: "", component: ProjectDataComponent }]),
  ],
  exports: [RouterModule],
})
export class ProjectDataModule {}
