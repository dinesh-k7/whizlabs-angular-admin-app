import { Component, OnInit, Input } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { IDivision } from "~models/division";
import { DivisionService } from "~services/division.service";
import { ModalFormComponent } from "../modal-form/modal-form.component";
import { CONSTANT } from "~app/utils/constant";
import { ConfirmComponent } from "~app/components/confirm/confirm.component";

@Component({
  selector: "app-division",
  templateUrl: "./division.component.html",
  styleUrls: ["./division.component.scss"],
})
export class DivisionComponent implements OnInit {
  @Input("departmentId") departmentId: number;
  divisionForm: FormGroup;
  division: IDivision;
  isLoading = false;
  divisionList: IDivision[];
  public displayedColumns = ["id", "name", "action"];

  constructor(
    private formBuilder: FormBuilder,
    private divisionService: DivisionService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createForm();
    if (this.departmentId) {
      this.getDivision();
    }
  }

  public createForm() {
    this.divisionForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
  }

  public onCancel(): void {
    this.router.navigate(["/department"]);
  }

  addNew() {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      width: "800px",
      data: {
        action: CONSTANT.ADD_DIVISION,
        title: "Add Division",
        department_id: this.departmentId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDivision();
      }
    });
  }

  editDivision(row: IDivision): void {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      width: "800px",
      data: {
        action: CONSTANT.ADD_DIVISION,
        title: "Edit Division",
        department_id: this.departmentId,
        division: row,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDivision();
      }
    });
  }

  deleteDivision(row: IDivision): void {
    const { id } = row;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "400px",
      data: {
        title: "Delete record",
        message: "Are you sure you want to delete this division?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.divisionService.$delete(id).subscribe((data: any) => {
          this.getDivision();
        });
      }
    });
  }

  private getDivision(): void {
    this.isLoading = true;
    this.divisionService.$getList(this.departmentId).subscribe(
      (divisionData) => {
        this.isLoading = false;
        this.divisionList = divisionData;
      },
      () => {
        this.isLoading = false;
        this.divisionList = [];
      }
    );
  }
}
