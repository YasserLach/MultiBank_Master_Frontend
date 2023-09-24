import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {CustomersService} from "../services/customers.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  userName:String = "Yasser"

  constructor(public appState:AppStateService,private customerService:CustomersService) {
  }
  getSingleCustomer(){
    this.customerService.getCustomerByName(this.userName).subscribe({
      next : value => {
        this.appState.dataState.customers = value;
        console.log(this.appState.dataState.customers)
      },
      error : err => console.log(err)
    })
  }

  ngOnInit(): void {
    this.getSingleCustomer()
  }

}
