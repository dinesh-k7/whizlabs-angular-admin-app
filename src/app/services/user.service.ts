import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { CONSTANT } from "~app/utils/constant";

import { Response } from "~app/models/response";

import { Provider } from "~base/provider";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IUser } from "~models/user";

@Injectable()
export class UserService {
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

    return this.http.get<Response>(CONSTANT.routes.user.list, {
      params: params,
    });
  }

  public $delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANT.routes.user.delete.replace(":id", String(id))
    );
  }

  public $getUser(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.user.get.replace(":id", String(id))
    );
  }

  public $save(user: IUser): Observable<Response> {
    return this.http.post<Response>(CONSTANT.routes.user.save, user);
  }

  public $getDepartment(): Observable<any> {
    return this.http.get<Response>(CONSTANT.routes.department.list);
  }

  public $update(user: IUser, id: number): Observable<Response> {
    return this.http.put<Response>(
      CONSTANT.routes.user.update.replace(":id", String(id)),
      user
    );
  }
}
