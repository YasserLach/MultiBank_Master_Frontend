import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public dataState : any = {
    loading: true,
    userName: "",
    customers : [],
    accounts : [],
    operations : [],
    keyword : "",
    totalPages:0,
    pageSize:4,
    currentPage:0,
    totalCustomers:0,
    totalAccounts:0,
    totalOperations:0
  }

  constructor() { }
}
