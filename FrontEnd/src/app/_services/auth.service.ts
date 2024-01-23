import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { IAuthToken } from "../_models/auth_token";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}
  Base_URL = "http://localhost:3000/api/";
  private currentUserSource = new BehaviorSubject<IAuthToken | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  TYPE_USER_KEY: string;

  // Login
  login(user: any): Observable<any> {
    const requestBody = {
      matricule: user.matricule,
      code_acces: user.password
    };

    return this.http.post<any>(this.Base_URL + "login", requestBody).pipe(
      map((response: any) => {
        const userLogged = response;
        const mappedData: IAuthToken = {
          status: userLogged.status,
          message: userLogged.message,
          data: {
            id: userLogged.data.id,
            matricule: userLogged.data.matricule,
            nom: userLogged.data.nom,
            prenom: userLogged.data.prenom,
            is_admin: userLogged.data.is_admin
          },
          isLoggedIn: true,
          token: userLogged.token
        };
        const user: any = {
          matricule: userLogged.data.matricule,
          code_acces: userLogged.data.code_acces
        };

        if (userLogged.status) {
          localStorage.setItem("IAuthToken", JSON.stringify(mappedData));
          sessionStorage.setItem("User", JSON.stringify(user));
          this.currentUserSource.next(mappedData);
        } else {
          this.logout();
        }
        return mappedData;
      })
    );
  }

  setCurrentUser(user: IAuthToken) {
    this.currentUserSource.next(user);
  }

  getTypeUser(): any {
    const authTokenString = localStorage.getItem("IAuthToken");
    if (authTokenString) {
      try {
        const authToken = JSON.parse(authTokenString);

        // Make sure 'is_admin' property exists before returning its value
        if (
          authToken &&
          authToken.data &&
          authToken.data.is_admin !== undefined
        ) {
          switch (authToken.data.is_admin) {
            case 1:
              this.TYPE_USER_KEY = "ADMIN";
              return this.TYPE_USER_KEY;

            case 0:
              break;
          }
        }
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }

  logout() {
    localStorage.removeItem("IAuthToken");
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("User");
    this.currentUserSource.next(null);
  }
}
