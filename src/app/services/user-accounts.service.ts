import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserAccountsService {

  constructor(private http:HttpClient) { }

  public getAccountsByUserName(userName:String, keyword:String="", page:number=0, size:number=4){
    return this.http.get(`http://localhost:8085/bankAccount/test?userName=${userName}&keyword=${keyword}&page=${page}&size=${size}`,{observe:"response"});
  }


}
