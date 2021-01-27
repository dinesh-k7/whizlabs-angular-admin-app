import { Component, OnInit } from "@angular/core";

import { AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";

import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { ProjectDataService } from "~services/project-data.service";
import { AuthService } from "~services/auth.service";

/**
 * Project data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface ProjectNode {
  name: string;
  id: number;
  type: string;
  children?: ProjectNode[];
}

@Component({
  selector: "app-project-data",
  templateUrl: "./project-data.component.html",
  styleUrls: ["./project-data.component.scss"],
})
export class ProjectDataComponent implements AfterViewInit, OnInit {
  public userId: number;
  public departmentId: number;
  public treeControl = new NestedTreeControl<ProjectNode>(
    (node) => node.children
  );
  public dataSource = new MatTreeNestedDataSource<ProjectNode>();
  public isLoading = false;
  public child: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private projectDataService: ProjectDataService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {}

  hasChild = (_: number, node: ProjectNode) => true;

  ngOnInit() {
    if (!this.authService.loggedIn.getValue()) {
      this.router.navigate(["/login"]);
    }
    this.userId = 17;
    this.departmentId = 22;
  }

  ngAfterViewInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  public getData(): void {
    this.isLoading = true;
    this.projectDataService.$getList().subscribe(
      (projectData) => {
        this.isLoading = false;
        const division = [];

        // Form child element array for tree structure
        projectData.map((d) => {
          const checkDivision = division.find((dv) => dv.id === d.division_id);
          !checkDivision &&
            division.push({
              name: d.division_name,
              id: d.division_id,
              type: "child",
              department_id: d.department_id,
            });
        });

        // Form parent element array for tree structure
        const treeData = [];
        projectData.map((department) => {
          const checkDepartment = treeData.find(
            (dp) => dp.id === department.department_id
          );
          !checkDepartment &&
            treeData.push({
              name: department.department_name,
              id: department.department_id,
              type: "parent",
              children: division.filter(
                (dv) => dv.department_id === department.department_id
              ),
            });
        });

        this.dataSource.data = treeData;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
