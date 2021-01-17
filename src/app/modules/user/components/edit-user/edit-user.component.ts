import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { IUser, IDepartment } from "~models/user";
import { Router, ActivatedRoute } from "@angular/router";

import { UserService } from "~services/user.service";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user: IUser;
  department: IDepartment[];
  isLoading: boolean = false;
  hidePwd: boolean = true;
  user_id: number;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDepartment();
    this.user_id = +this.activateRoute.snapshot.paramMap.get("id");
    this.getUser(this.user_id);
    this.createForm();
  }

  public createForm() {
    this.editUserForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      department_id: [null, [Validators.required]],
    });
  }

  public onSubmit(user: IUser) {
    this.isLoading = true;
    if (this.editUserForm.valid) {
      const {} = this.userService
        .$update({ ...this.editUserForm.value, active: true }, this.user_id)
        .subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate([""]);
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }

  private getDepartment(): void {
    this.userService.$getDepartment().subscribe(
      (departmentData) => {
        this.department = departmentData;
      },
      () => {
        this.department = [];
      }
    );
  }

  public onCancel(): void {
    this.router.navigate([""]);
  }

  private getUser(id: number): void {
    this.userService.$getUser(id).subscribe((userData) => {
      const [user] = userData;
      this.user = {
        name: user.name,
        department_id: user.department_id,
        password: user.password,
        email: user.email,
      };
      this.editUserForm.setValue(this.user);
    });
  }
}
