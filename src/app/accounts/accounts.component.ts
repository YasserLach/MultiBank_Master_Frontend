import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{


  constructor(public appState:AppStateService,private accountService:AccountsService) {
  }

  isShown : boolean = false;
  accountId : number =0;
  public ListAccountsPageable() {
    this.accountService.getAccountsPerPage(this.appState.dataState.keyword, this.appState.dataState.currentPage, this.appState.dataState.pageSize)
      .subscribe({
        next : resp => {
          this.appState.dataState.accounts = resp.body
          this.appState.dataState.loading = false
        },
        error : err => console.log(err)
      })
  }

  ngOnInit(): void {
    this.appState.dataState.keyword = ""
    this.appState.dataState.loading = true;
    this.ListAccountsPageable();
  }

  handleGoToPage(page: number) {
    this.appState.dataState.currentPage = page;
    this.ListAccountsPageable();
  }

  deleteUser() {
    this.accountService.removeAccountService(this.accountId).
    subscribe({
      next : resp => {
        this.ListAccountsPageable()
        this.isShown = false
      },
      error : err => console.log(err)
    })
  }

  showPopUp(id:number) {
    this.isShown = true;
    this.accountId = id;
  }
}
