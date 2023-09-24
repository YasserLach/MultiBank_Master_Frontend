import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../services/customers.service";
import {AppStateService} from "../services/app-state.service";
import {Customer} from "../../../Models/customer.model";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  constructor(private customerService : CustomersService, public appState:AppStateService,private authService:AuthService,private route:Router) {
  }

  isShown : boolean = false;
  customerId : number=0;


  getCustomers() {
      this.customerService.getCustomers().subscribe({
        next : res => {
          this.appState.dataState.customers = res
          console.log(this.appState.dataState.customers)},
        error: err => {console.log(err)}
      })
  }

  getCustomersPerPage() {
    this.customerService.getCustomersPerPage(this.appState.dataState.keyword,this.appState.dataState.currentPage,this.appState.dataState.pageSize)
      .subscribe({
      next : resp => {
        this.appState.dataState.customers = resp.body as Customer[];
        this.appState.dataState.loading = false
        console.log(this.appState.dataState.customers)
      },
      error: err => console.log(err)
    })
  }

  ngOnInit(): void {
    if(this.authService.roles ==="ROLE_USER") {
      this.route.navigateByUrl("/not-autho")
    } else {
      this.appState.dataState.keyword = ""
      this.appState.dataState.loading = true;
      this.getCustomersPerPage()
    }
  }

  handleGoToPage(number: number) {
    this.appState.dataState.currentPage = number;
    this.getCustomersPerPage()
  }

  deleteUser() {
    this.customerService.removeCustomerService(this.customerId).
    subscribe({
      next : resp => {
        this.getCustomersPerPage()
        this.isShown = false
      },
      error : err => console.log(err)
    })
  }

  showPopUp(id:number) {
    this.isShown = true;
    this.customerId = id;
  }
}
