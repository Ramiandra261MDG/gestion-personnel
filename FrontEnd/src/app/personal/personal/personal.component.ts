import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { IPersonal } from "../../_models/personal";
import { Subscription, map } from "rxjs";
import { PersonalService } from "../../_services/personal.service";
import { TableModule } from "primeng/table";
import { PaginatorModule } from "primeng/paginator";
import { AuthService } from "../../_services/auth.service";
import { IUser } from "../../_models/user";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { StatusPipe } from "../../status.pipe";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-personal",
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
    StatusPipe,
    ToastModule
  ],
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.css"]
})
export class PersonalComponent implements OnInit, OnDestroy {
  user_state: IUser;
  personals: IPersonal[];
  subscription: Subscription = new Subscription();
  totalRecords: number;
  first: number = 0;
  rows: number = 10;
  currentPage: number = 0;
  loading: boolean | undefined;

  accountService = inject(AuthService);

  constructor(
    private personalService: PersonalService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$
      .pipe(
        map(res => {
          if (res) {
            this.user_state = res.data;
          }
        })
      )
      .subscribe();
    this.subscription.add(this.getAllPersonal(this.currentPage + 1, false));
  }

  getAllPersonal(page?: number | any, load?: boolean) {
    if (this.user_state.is_admin === 0) {
      this.router.navigateByUrl("/home");
    } else if (this.user_state.is_admin === 1) {
      this.loading = true;
      this.personalService.getAll(page).subscribe({
        next: res => {
          this.loading = load;
          this.personals = res.data;
          this.totalRecords = res.count;
          console.log(this.personals);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    let page = this.first / 5 + 1;
    // //    console.log(page);

    this.getAllPersonal(page, false);
  }

  desactivatePersonal(id: number) {
    if (this.user_state.is_admin === 1) {
      this.personalService.desactiveDelete(id).subscribe({
        next: res => {
          console.log(res);
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }

  toastConnected() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Vous êtes connecté."
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
