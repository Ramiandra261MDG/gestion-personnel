import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPersonal } from "../_models/personal";

@Injectable({
  providedIn: "root"
})
export class PersonalService {
  constructor(private http: HttpClient) {}
  Base_URL = "http://localhost:3000/api/";

  getToken() {
    const token = localStorage.getItem("access_token");

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return headers;
  }

  getAll(page: number): Observable<any> {
    const headers = this.getToken();

    return this.http.get<IPersonal>(this.Base_URL + "users?page=" + page, {
      headers
    });
  }

  getByPk(id: number): Observable<any> {
    const headers = this.getToken();

    return this.http.get<IPersonal>(this.Base_URL + "users/" + id, {
      headers
    });
  }

  //this function have a job for desactivate an account or delete an account if it is desactivate
  desactiveDelete(id: number) {
    const headers = this.getToken();

    return this.http.delete<IPersonal>(this.Base_URL + "users/" + id, {
      headers
    });
  }
}
