import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { CONSTANT } from "~app/utils/constant";
import { Response } from "~app/models/response";
import { IDepartment } from "~models/user";

@Injectable()
export class DepartmentService {
  loading = true;

  constructor(private http: HttpClient) {}

  public $getList(
    sortActive: string,
    order: string,
    pageSize: number,
    page: number,
    search: string
  ): Observable<Response> {
    let params = new HttpParams();
    params = params.append("active", sortActive);
    params = params.append("order", order);
    params = params.append("search", search);
    params = params.append("pageSize", pageSize.toString());
    params = params.append("page", page.toString());

    return this.http.get<Response>(CONSTANT.routes.department.list, {
      params: params,
    });
  }

  public $delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANT.routes.department.delete.replace(":id", String(id))
    );
  }

  public $get(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.department.get.replace(":id", String(id))
    );
  }

  public $save(department: IDepartment): Observable<any> {
    return this.http.post<Response>(
      CONSTANT.routes.department.save,
      department
    );
  }

  public $getDepartmentByName(name?: string): Observable<any> {
    return this.http.get<Response>(
      `${CONSTANT.routes.department.filter}?name=${name}`
    );
  }

  public $update(department: IDepartment, id: number): Observable<Response> {
    return this.http.put<Response>(
      CONSTANT.routes.department.update.replace(":id", String(id)),
      department
    );
  }

  public $getDetails(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.department.get_detail.replace(":id", String(id))
    );
  }
}
