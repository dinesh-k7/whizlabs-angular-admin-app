import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { IUser, IDepartment } from "~models/user";
import { UserService } from "~services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  user: IUser;
  department: IDepartment[];
  isLoading: boolean = false;
  hidePwd: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDepartment();
    this.createForm();
  }

  public createForm() {
    this.addUserForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      department_id: [null, [Validators.required]],
    });
  }

  public onSubmit(user: IUser) {
    if (this.addUserForm.valid) {
      this.isLoading = true;
      const {} = this.userService
        .$save({ ...this.addUserForm.value, active: true })
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
}
