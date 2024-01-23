import { Routes } from "@angular/router";
import { authGuard } from "./_guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./auth/login/login.component").then(m => m.LoginComponent)
  },
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: "personal",
    loadComponent: () =>
      import("./personal/personal/personal.component").then(
        m => m.PersonalComponent
      ),
    canActivate: [authGuard]
  }
];
