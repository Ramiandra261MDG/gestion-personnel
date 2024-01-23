import { Component, OnInit } from "@angular/core";
import { IUser } from "../_models/user";
import { RouterLink } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-nav",
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.css"
})
export class NavComponent implements OnInit {
  user$: BehaviorSubject<IUser> = new BehaviorSubject<any>(null);

  ngOnInit(): void {
    const res = this.getItem("IAuthToken");
    const user = res?.data;
    this.user$.next(user);
    console.log(user);

      // Subscribe to changes if needed
      this.user$.subscribe(updatedUser => {
        console.log("User updated:", updatedUser);
        // Perform any additional actions upon user update
      });
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
}
