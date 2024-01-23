import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { IAuthToken } from "../../_models/auth_token";
import { AuthService } from "../../_services/auth.service";
import { Router } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { MessagesModule } from "primeng/messages";
import { MessageService } from "primeng/api";
import { PanelModule } from "primeng/panel";
import { map } from "rxjs";
import { IUser } from "../../_models/user";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    MessagesModule,
    PanelModule
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginValue: any;
  user_state: IUser;
  errors: any;
  accountService = inject(AuthService);
  isLogin: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      matricule: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.accountService.currentUser$
      .pipe(
        map(res => {
          if (res) {
            this.user_state = res.data;
            this.isLogin = res.isLoggedIn;
          }
        })
      )
      .subscribe();
    if (this.isLogin === true) {
      this.router.navigateByUrl("/home");
    }
  }

  submitLogin() {
    this.loginValue = {
      matricule: this.loginForm.value.matricule,
      password: this.loginForm.value.password
    };

    //console.log(this.loginValue);

    this.authService.login(this.loginValue).subscribe({
      next: res => {
        if (res.status) {
          const token = res.token;
          localStorage.setItem("access_token", token);

          this.router.navigateByUrl("/home");
        }
      },
      error: error => {
        this.errors = error.error;
        //        console.log(this.errors);

        this.loginForm = this.fb.group({
          matricule: [""],
          password: [""]
        });

        this.passError("error", "", this.errors.message);
      }
    });
  }

  passError(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }
}
