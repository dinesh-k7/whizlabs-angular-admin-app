import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "~utils/shared.module";

import { UserComponent } from "./user.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: "", component: UserComponent, pathMatch: "full" },
      { path: "add-user", component: AddUserComponent },
      { path: "edit-user/:id", component: EditUserComponent },
    ]),
    SharedModule,
  ],
  declarations: [
    UserComponent,
    AddUserComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  providers: [],

  exports: [RouterModule],
})
export class UserModule {}
