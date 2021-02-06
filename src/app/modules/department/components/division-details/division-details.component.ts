import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-division-details",
  templateUrl: "./division-details.component.html",
  styleUrls: ["./division-details.component.scss"],
})
export class DivisionDetailsComponent implements OnInit {
  public details: any = [];
  constructor(
    public dialogRef: MatDialogRef<DivisionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      const { details } = this.data;
      this.details = details;
    }
  }
}
