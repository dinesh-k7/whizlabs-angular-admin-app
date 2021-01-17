import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { CONSTANT } from "~app/utils/constant";
import { Response } from "~app/models/response";
import { IDivision } from "~models/division";

@Injectable()
export class DivisionService {
  loading = true;

  constructor(private http: HttpClient) {}

  public $getList(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.division.list.replace(":id", String(id))
    );
  }

  public $delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANT.routes.division.delete.replace(":id", String(id))
    );
  }

  public $get(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.division.get.replace(":id", String(id))
    );
  }

  public $save(division: IDivision): Observable<Response> {
    return this.http.post<Response>(CONSTANT.routes.division.save, division);
  }

  public $update(division: IDivision, id: number): Observable<Response> {
    return this.http.put<Response>(
      CONSTANT.routes.division.update.replace(":id", String(id)),
      division
    );
  }
}
