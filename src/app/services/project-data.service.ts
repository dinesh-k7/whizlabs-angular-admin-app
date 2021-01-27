import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONSTANT } from "~app/utils/constant";

import { Response } from "~app/models/response";

import { Observable, BehaviorSubject } from "rxjs";

import { IProjectData } from "~models/project-data";

@Injectable()
export class ProjectDataService {
  constructor(private http: HttpClient) {}
  public formSubmitted = new BehaviorSubject<boolean>(false);

  get isFormSubmitted() {
    return this.formSubmitted.asObservable();
  }

  public $getList(): Observable<any> {
    return this.http.get<any>(CONSTANT.routes.project_data.list);
  }

  public $delete(id: number): Observable<Response> {
    return this.http.delete<Response>(
      CONSTANT.routes.project_data.delete.replace(":id", String(id))
    );
  }

  public $get(id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.project_data.get.replace(":id", String(id))
    );
  }

  public $getByUserId(user_id: number): Observable<any> {
    return this.http.get<Response>(
      CONSTANT.routes.project_data.get_by_userid.replace(":id", String(user_id))
    );
  }

  public $save(projectData: IProjectData): Observable<Response> {
    return this.http.post<Response>(
      CONSTANT.routes.project_data.save,
      projectData
    );
  }

  public $update(projectData: IProjectData, id: number): Observable<Response> {
    return this.http.put<Response>(
      CONSTANT.routes.project_data.update.replace(":id", String(id)),
      projectData
    );
  }

  public $getFormField(user_id: number, division_id: number): Observable<any> {
    const url = CONSTANT.routes.project_data.get_form_field.replace(
      ":divisionId",
      String(division_id)
    );

    return this.http.get<Response>(url.replace(":userId", String(user_id)));
  }
}
