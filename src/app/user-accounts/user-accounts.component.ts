import {Component, OnInit} from '@angular/core';
import {UserAccountsService} from "../services/user-accounts.service";
import {AppStateService} from "../services/app-state.service";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit{

  constructor(private userService:UserAccountsService,public appState:AppStateService,private authService:AuthService) {
  }

  public encodeUrl(accountId:string) {
    return encodeURIComponent(accountId);
  }

  public listAccountsForUser(){
    this.userService.getAccountsByUserName(this.appState.dataState.userName,this.appState.dataState.keyword,this.appState.dataState.currentPage,this.appState.dataState.pageSize)
      .subscribe({
        next : resp =>{
          this.appState.dataState.accounts = resp.body
          this.appState.dataState.loading = false
        },
        error : err => console.log(err)
      })
  }

  ngOnInit(): void {
    this.appState.dataState.keyword =""
    this.appState.dataState.loading = true;
    this.appState.dataState.currentPage = 0;
    this.appState.dataState.userName = this.authService.username;
    this.listAccountsForUser();
  }

  handleGoToPage(page: number) {
    this.appState.dataState.currentPage = page;
    this.listAccountsForUser();
  }

  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly encodeURI = encodeURI;
}
