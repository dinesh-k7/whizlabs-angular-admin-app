import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { IModalForm } from "~app/models/dialog-data";
import { CONSTANT } from "~app/utils/constant";
import { DivisionService } from "~services/division.service";
import { DivisionFieldService } from "~services/division-field.service";
import { IDivision } from "~app/models/division";

@Component({
  selector: "app-modal-form",
  templateUrl: "./modal-form.component.html",
  styleUrls: ["./modal-form.component.scss"],
})
export class ModalFormComponent implements OnInit {
  isAddDivision: boolean;
  isField: boolean;
  divisionForm: FormGroup;
  fieldForm: FormGroup;
  isLoading = false;
  departmentId: number;
  divisionId: number;
  divisionFieldId: number;
  divisionList: IDivision[] = [];
  constructor(
    public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalForm,
    private formBuilder: FormBuilder,
    private divisionService: DivisionService,
    private divisionFieldService: DivisionFieldService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      const {
        action,
        department_id,
        division,
        division_field,
        division_id,
      } = this.data;

      this.isAddDivision = action === CONSTANT.ADD_DIVISION ? true : false;
      this.isField = action === CONSTANT.ADD_DIVISION_FIELD ? true : false;
      this.departmentId = department_id;
      this.divisionId = division_id || (division && division.id);
      this.divisionFieldId = division_field && division_field.id;
      // this.divisionList = division_list;
      this.getDivision(department_id);
    }

    if (this.isAddDivision) {
      this.createDivisionForm();
    } else if (this.isField) {
      this.createFieldForm();
    }
  }

  private createDivisionForm(): void {
    this.divisionForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
    if (this.divisionId) {
      const {
        division: { name },
      } = this.data;
      this.divisionForm.setValue({ name });
    }
  }

  private createFieldForm(): void {
    this.fieldForm = this.formBuilder.group({
      name: [null, Validators.required],
      type: [null, Validators.required],
      division_id: [null, Validators.required],
    });
    if (this.divisionFieldId) {
      const {
        division_field: { name, type, division_id },
      } = this.data;
      this.fieldForm.setValue({ name, type, division_id });
    }
  }

  public onSubmit() {
    if (this.divisionForm && this.divisionForm.valid) {
      this.isLoading = true;
      return this.divisionId
        ? this.updateDivision(this.divisionId)
        : this.saveDivision();
    } else if (this.fieldForm && this.fieldForm.valid) {
      this.isLoading = true;
      return this.divisionFieldId
        ? this.updateDivisionField(this.divisionFieldId)
        : this.saveDivisionField();
    }
  }

  private saveDivision(): void {
    this.divisionService
      .$save({ ...this.divisionForm.value, department_id: this.departmentId })
      .subscribe(
        () => {
          this.isLoading = false;
          this.dialogRef.close({ success: true });
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  private saveDivisionField(): void {
    this.divisionFieldService
      .$save({ ...this.fieldForm.value, department_id: this.departmentId })
      .subscribe(
        () => {
          this.isLoading = false;
          this.dialogRef.close({ success: true });
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  private updateDivision(_id: number): void {
    this.divisionService
      .$update(
        { ...this.divisionForm.value, department_id: this.departmentId },
        _id
      )
      .subscribe(
        () => {
          this.isLoading = false;
          this.dialogRef.close({ success: true });
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  private updateDivisionField(_id: number): void {
    this.divisionFieldService
      .$update(
        { ...this.fieldForm.value, department_id: this.departmentId },
        _id
      )
      .subscribe(
        () => {
          this.isLoading = false;
          this.dialogRef.close({ success: true });
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  private getDivision(id: number): void {
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
