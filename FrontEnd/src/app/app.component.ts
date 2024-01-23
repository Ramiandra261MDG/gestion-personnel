import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { IAuthToken } from "./_models/auth_token";
import { AuthService } from "./_services/auth.service";
import { NavComponent } from "./nav/nav.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  userLogged: IAuthToken;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem("IAuthToken");
    if (!userString) return;
    const user: IAuthToken = JSON.parse(userString);
    this.authService.setCurrentUser(user);
  }
}
