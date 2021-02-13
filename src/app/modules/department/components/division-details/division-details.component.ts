import { Component, OnInit, Input } from "@angular/core";

import { DivisionFieldService } from "~services/division-field.service";

@Component({
  selector: "app-division-details",
  templateUrl: "./division-details.component.html",
  styleUrls: ["./division-details.component.scss"],
})
export class DivisionDetailsComponent implements OnInit {
  @Input() divisionId: number;
  @Input() node: any;
  public fields: any = [];
  public isLoading = false;
  constructor(private readonly divisionFieldService: DivisionFieldService) {}

  ngOnInit(): void {
    if (this.divisionId) {
      this.getDivisionFields(this.divisionId);
    } else {
      this.fields = [];
    }
  }

  private getDivisionFields(divisionId: number): void {
    this.isLoading = true;
    this.divisionFieldService.$listFields(divisionId).subscribe((data) => {
      this.isLoading = false;
      if (data && data.length) {
        const [, fields] = data;
        this.fields = fields;
      }
    });
  }
}
