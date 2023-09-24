import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../../Models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http : HttpClient) { }



  public getCustomers():Observable<Customer> {
    // @ts-ignore
    return this.http.get("http://localhost:8085/customers")
  }

  public getCustomersPerPage(keyword:String="",page:number=0,size:number=3) {
    return this.http.get(`http://localhost:8085/customers/v2?keyword=${keyword}&page=${page}&size=${size}`,{observe:'response'});
  }

  public getInactiveCustomersPerPage(keyword:String="",page:number=0,size:number=3) {
    return this.http.get(`http://localhost:8085/customers/inactive?keyword=${keyword}&page=${page}&size=${size}`,{observe:'response'});
  }

  public activateUser(id:number) {
    return this.http.get(`http://localhost:8085/customers/activate/${id}`)
  }

  public removeCustomerService(id:number) {
    return this.http.delete(`http://localhost:8085/customers/${id}`);
  }

  public getCustomerByName(userName:String) {
    return this.http.get(`http://localhost:8085/customers/${userName}`)
  }

  public addNewCustomer(customer: Customer) :Observable<Customer> {
    return  this.http.post<Customer>("http://localhost:8085/customers/addNewOne",customer)
  }

}
