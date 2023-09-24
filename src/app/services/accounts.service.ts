import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppStateService} from "./app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  public getAccounts() {
    return this.http.get("http://localhost:8085/bankAccount")
  }


  public getAccountsPerPage(keyword:String="",page:number=0,size:number=5) {
    return this.http.get(`http://localhost:8085/bankAccount/v2?keyword=${keyword}&page=${page}&size=${size}`,{observe:'response'})
  }

  public removeAccountService(id:number) {
    return this.http.delete(`http://localhost:8085/bankAccount/${id}`);
  }


}
