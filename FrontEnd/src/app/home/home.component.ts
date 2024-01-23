import { PersonalService } from "./../_services/personal.service";
import { Component, OnInit, inject } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { map } from "rxjs";
import { IUser } from "../_models/user";
import { IPersonal } from "../_models/personal";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ButtonModule, CardModule, DatePipe],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css"
})
export class HomeComponent implements OnInit {
  accountService = inject(AuthService);
  userState: IUser;
  userConnected: IPersonal;

  constructor(
    private router: Router,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$
      .pipe(
        map(res => {
          if (res) {
            this.userState = res.data;
          }
        })
      )
      .subscribe();
    this.getFullInfo(this.userState.id);
  }

  getFullInfo(id: number) {
    this.personalService.getByPk(id).subscribe(res => {
      this.userConnected = res.data;
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("");
  }
}
