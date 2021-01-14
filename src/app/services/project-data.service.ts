import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { CONSTANT } from "~app/utils/constant";
import { Response } from "~app/models/response";
import { IDepartment } from "~models/user";

@Injectable()
export class ProjectDataService {
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

    return this.http.get<Response>(CONSTANT.routes.project_data.list, {
      params: params,
    });
  }

  public $get(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.project_data.get.replace(":id", String(id))
    );
  }
}
