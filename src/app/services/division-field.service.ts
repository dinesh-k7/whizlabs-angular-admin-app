import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { CONSTANT } from "~app/utils/constant";
import { Response } from "~app/models/response";
import { IDivisionField } from "~models/division";

@Injectable()
export class DivisionFieldService {
  loading = true;

  constructor(private http: HttpClient) {}

  public $getList(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.department.get_detail.replace(":id", String(id))
    );
  }

  public $delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANT.routes.division_field.delete.replace(":id", String(id))
    );
  }

  public $get(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.division_field.get.replace(":id", String(id))
    );
  }

  public $listFields(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.division_field.list.replace(":id", String(id))
    );
  }

  public $save(division: IDivisionField): Observable<Response> {
    return this.http.post<Response>(
      CONSTANT.routes.division_field.save,
      division
    );
  }

  public $update(division: IDivisionField, id: number): Observable<Response> {
    return this.http.put<Response>(
      CONSTANT.routes.division_field.update.replace(":id", String(id)),
      division
    );
  }
}
