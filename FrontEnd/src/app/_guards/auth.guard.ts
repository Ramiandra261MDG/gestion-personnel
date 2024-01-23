import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../_services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AuthService);

  return accountService.currentUser$.pipe(
    map(user => {
      if (user){
        console.log("Vous etes connecter");
        return true;
      }
      else {
        console.log("Vous devez vous connecter");
        return false;
      }
    })
  );
};
