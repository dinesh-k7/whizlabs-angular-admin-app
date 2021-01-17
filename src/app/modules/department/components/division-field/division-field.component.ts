import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { ConfirmComponent } from "~app/components/confirm/confirm.component";
import { DivisionFieldService } from "~services/division-field.service";
import { ModalFormComponent } from "../modal-form/modal-form.component";
import { CONSTANT } from "~app/utils/constant";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IDivisionField, IDivision } from "~app/models/division";
import { DivisionService } from "~app/services/division.service";

@Component({
  selector: "app-division-field",
  templateUrl: "./division-field.component.html",
  styleUrls: ["./division-field.component.scss"],
})
export class DivisionFieldComponent implements OnInit {
  @Input("departmentId") departmentId: any;
  displayedColumns: string[] = ["id", "name", "type", "division", "action"];
  divisionFieldForm: FormGroup;
  divisionField: IDivisionField;
  isLoading = false;
  divisionFieldList: IDivisionField[];
  divisionList: IDivision[];
  constructor(
    private formBuilder: FormBuilder,
    private divisionFieldService: DivisionFieldService,
    public dialog: MatDialog,
    private divisionService: DivisionService
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.departmentId) {
      this.getDivisionField();
    }
  }

  public createForm() {
    this.divisionFieldForm = this.formBuilder.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      division_id: [null, Validators.required],
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      width: "800px",
      data: {
        title: "Add Division Field",
        action: CONSTANT.ADD_DIVISION_FIELD,
        department_id: this.departmentId,
        division_list: this.divisionList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDivisionField();
      }
    });
  }

  editDivisionField(row: IDivisionField): void {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      width: "800px",
      data: {
        action: CONSTANT.ADD_DIVISION_FIELD,
        title: "Edit Division Field",
        division_field: row,
        division_list: this.divisionList,
        department_id: this.departmentId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDivisionField();
      }
    });
  }

  public deleteDivisionField(row: IDivisionField): void {
    const { id } = row;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "400px",
      data: {
        title: "Delete record",
        message: "Are you sure you want to delete this Division Field?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.divisionFieldService.$delete(id).subscribe((data: any) => {
          this.getDivisionField();
        });
      }
    });
  }

  private getDivisionField(): void {
    this.isLoading = true;
    this.divisionFieldService.$getList(this.departmentId).subscribe(
      (divisionData) => {
        this.isLoading = false;
        this.divisionFieldList = divisionData;
      },
      () => {
        this.isLoading = false;
        this.divisionFieldList = [];
      }
    );
  }
}
