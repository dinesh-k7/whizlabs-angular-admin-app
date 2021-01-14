import { Component, OnInit } from "@angular/core";

import { AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { ProjectDataService } from "~services/project-data.service";
import { ConfirmComponent } from "~components/confirm/confirm.component";
import { AuthService } from "~services/auth.service";

@Component({
  selector: "app-project-data",
  templateUrl: "./project-data.component.html",
  styleUrls: ["./project-data.component.css"],
})
export class ProjectDataComponent implements AfterViewInit, OnInit {
  public displayedColumns = ["id", "name", "department_name", "created"];
  public pageSizeOptions = [5, 10, 20, 40, 100];
  public pageSize = 20;
  public dataSource: any = new MatTableDataSource();
  public pageEvent: PageEvent;
  public resultsLength = 0;
  public page = 1;
  public isLoading = false;
  public isTotalReached = false;
  public totalItems = 0;
  public search = "";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private projectDataService: ProjectDataService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.authService.loggedIn.getValue()) {
      this.router.navigate(["/login"]);
    }
  }

  ngAfterViewInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  public onPaginateChange(event: any): void {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getData();
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.getData();
  }

  public getData(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.projectDataService.$getList(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.search
          );
        }),
        map((usersList) => {
          this.isLoading = false;
          this.isTotalReached = false;
          this.totalItems = usersList["length"];
          return usersList;
        }),
        catchError(() => {
          this.isLoading = false;
          this.isTotalReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.dataSource.data = data));
  }
}
