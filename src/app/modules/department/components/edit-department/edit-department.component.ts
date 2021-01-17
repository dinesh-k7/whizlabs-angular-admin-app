import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { IUser, IDepartment } from "~models/user";
import { DepartmentService } from "~services/department.service";

@Component({
  selector: "app-edit-department",
  templateUrl: "./edit-department.component.html",
  styleUrls: ["./edit-department.component.scss"],
})
export class EditDepartmentComponent implements OnInit {
  editDepartmentForm: FormGroup;
  department: IDepartment;
  isLoading = false;
  isDepartmentExist = false;
  departmentId: number;
  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.departmentId = +this.activateRoute.snapshot.paramMap.get("id");
    this.getDepartment(this.departmentId);
    this.createForm();
  }

  public createForm() {
    this.editDepartmentForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  public onSubmit() {
    if (this.editDepartmentForm.valid) {
      this.isLoading = true;
      const { name } = this.editDepartmentForm.value;
      this.departmentService.$getDepartmentByName(name).subscribe((data) => {
        if (data && data.length > 1) {
          this.isLoading = false;
          this.isDepartmentExist = true;
        } else {
          this.isDepartmentExist = false;
          this.updateDepartment();
        }
      });
    }
  }

  public onCancel(): void {
    this.router.navigate(["/department"]);
  }

  private updateDepartment(): void {
    this.departmentService
      .$update({ ...this.editDepartmentForm.value }, this.departmentId)
      .subscribe(
        () => {
          this.isLoading = false;
          // this.router.navigate(["/department"]);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  private getDepartment(id: number): void {
    this.departmentService.$get(id).subscribe((departmentData) => {
      const [department] = departmentData;
      this.department = {
        name: department.name,
      };
      this.editDepartmentForm.setValue(this.department);
    });
  }
}
