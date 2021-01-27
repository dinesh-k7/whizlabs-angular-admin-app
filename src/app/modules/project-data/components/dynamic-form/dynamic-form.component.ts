import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

import { ProjectDataService } from "~services/project-data.service";

@Component({
  selector: "app-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.scss"],
})
export class DynamicFormComponent implements OnInit {
  @Input("formData") formData: any;
  @Input("dynamicForm") dynamicForm: any;
  @Input("divisionId") divisionId: number;
  @Input("divisionFieldId") divisionFieldId: number[];
  @Input("projectId") projectId: number;
  @Output() onClose = new EventEmitter<any>();
  isLoading: boolean;
  constructor(
    private readonly projectDataService: ProjectDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public onCancel(): void {
    this.router.navigate([""]);
  }
}
