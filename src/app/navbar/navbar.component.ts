import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {CustomersService} from "../services/customers.service";
import {Customer} from "../../../Models/customer.model";
import { Location } from '@angular/common';
import {AccountsService} from "../services/accounts.service";
import {UserAccountsService} from "../services/user-accounts.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public appState:AppStateService,private customerService:CustomersService,private accountService:AccountsService,private location: Location,
              private userService:UserAccountsService,public authService:AuthService,private route:Router) {
  }

  getCurrentUrl() {
    const currentUrl = this.location.path();
    console.log('Current URL:', currentUrl);
  }
  searchByKeyword(keyword: any) {
    if(this.location.path() === "/customers") {
      this.customerService.getCustomersPerPage(keyword,this.appState.dataState.currentPage,this.appState.dataState.pageSize).
      subscribe({
        next : resp => {
          this.appState.dataState.customers = resp.body as Customer[];
        },
        error : err => {console.log(err)}
      })
    } else if (this.location.path() === "/accounts") {
      this.accountService.getAccountsPerPage(keyword,this.appState.dataState.currentPage,this.appState.dataState.pageSize).
      subscribe({
        next : resp => {
          this.appState.dataState.accounts = resp.body;
        },
        error : err => {console.log(err)}
      })
    } else if (this.location.path() === "/user/accounts") {
      this.userService.getAccountsByUserName(this.appState.dataState.userName,keyword,this.appState.dataState.currentPage,this.appState.dataState.pageSize)
        .subscribe({
          next : resp => {
            this.appState.dataState.accounts = resp.body;
          },
          error : err => console.log(err)
        })
    }

  }

  handleLogOut() {
    this.authService.logout();
    this.route.navigateByUrl("/login");

  }
}
