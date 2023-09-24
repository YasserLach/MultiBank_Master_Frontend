import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http:HttpClient) { }

  public getOperations() {
    return this.http.get("http://localhost:8085/operations/all")
  }

  public getAccountDetails(accountId:String) {
    return this.http.get(`http://localhost:8085/bankAccount/${accountId}`)
  }

  public getOperationsDetails(accountId:String,page:number,size:number) {
    return this.http.get(`http://localhost:8085/operations?accountID=${accountId}&page=${page}&size=${size}`)
  }

  public credit(bankAccountId:String,solde:number) {
    return this.http.get(`http://localhost:8085/bankAccount/credit?bankAccountId=${bankAccountId}&solde=${solde}`)
  }

  public debit(bankAccountId:String,solde:number) {
    return this.http.get(`http://localhost:8085/bankAccount/debit?bankAccountId=${bankAccountId}&solde=${solde}`)
  }

  public transfert(bankAccountSourceId:String,bankAccountDestinationId:String,solde:number) {
    return this.http.get(`http://localhost:8085/bankAccount/transfert?bankAccountSourceId=${bankAccountSourceId}&bankAccountDestinationId=${bankAccountDestinationId}&solde=${solde}`)
  }


}
