import {
  Component,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { merge, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { DepartmentService } from "~services/department.service";
import { AuthService } from "~services/auth.service";
import { ConfirmComponent } from "~components/confirm/confirm.component";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"],
})
export class DepartmentComponent implements OnInit {
  public displayedColumns = ["id", "name", "created", "userid"];
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
    private departmentService: DepartmentService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) {}

  ngOnInit(): void {
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
          return this.departmentService.$getList(
            this.sort.active,
            this.sort.direction,
            this.pageSize,
            this.page,
            this.search
          );
        }),
        map((departmentList) => {
          this.isLoading = false;
          this.isTotalReached = false;
          this.totalItems = departmentList["length"];
          return departmentList;
        }),
        catchError(() => {
          this.isLoading = false;
          this.isTotalReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => (this.dataSource.data = data));
  }

  public editDepartment(department_id: number): void {
    this.router.navigate([`/department/edit-department/${department_id}`]);
  }

  public deleteDepartment(department_id: number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: "400px",
      data: {
        title: "Delete record",
        message: "Are you sure you want to delete this Department?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.departmentService.$delete(department_id).subscribe((data: any) => {
          this.paginator._changePageSize(this.paginator.pageSize);
        });
      }
    });
  }

  public addDepartment(): void {
    this.router.navigate(["/department/add-department"]);
  }
}
