import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { IUser, IDepartment } from "~models/user";
import { DepartmentService } from "~services/department.service";

@Component({
  selector: "app-add-department",
  templateUrl: "./add-department.component.html",
  styleUrls: ["./add-department.component.scss"],
})
export class AddDepartmentComponent implements OnInit {
  addDepartmentForm: FormGroup;
  department: IDepartment;
  isLoading = false;
  isDepartmentExist = false;
  departmentId: number;
  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  public createForm() {
    this.addDepartmentForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  public onSubmit() {
    if (this.addDepartmentForm.valid) {
      this.isLoading = true;
      const { name } = this.addDepartmentForm.value;
      this.departmentService.$getDepartmentByName(name).subscribe((data) => {
        if (data && data.length >= 1) {
          this.isLoading = false;
          this.isDepartmentExist = true;
        } else {
          this.isDepartmentExist = false;
          this.saveDepartment();
        }
      });
    }
  }

  public onCancel(): void {
    this.router.navigate(["/department"]);
  }

  private saveDepartment(): void {
    this.departmentService
      .$save({ ...this.addDepartmentForm.value, active: true })
      .subscribe(
        (departmentData) => {
          this.isLoading = false;
          const { id } = departmentData;
          this.departmentId = id;
          // this.router.navigate(["/department"]);
        },
        () => {
          this.isLoading = false;
        }
      );
  }
}
