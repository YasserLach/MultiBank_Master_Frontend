import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {CustomersService} from "../services/customers.service";

@Component({
  selector: 'app-inactive-customers',
  templateUrl: './inactive-customers.component.html',
  styleUrls: ['./inactive-customers.component.css']
})
export class InactiveCustomersComponent implements OnInit{


  constructor(public appState:AppStateService,private customerService:CustomersService) {
  }

  showValidation:boolean = false;
  idUser !:number;


  listInactivatedUsers() {
    this.customerService.getInactiveCustomersPerPage(this.appState.dataState.keyword,this.appState.dataState.currentPage,this.appState.dataState.pageSize)
      .subscribe({
        next : resp => {
          this.appState.dataState.customers = resp.body
          console.log(this.appState.dataState.customers)
        },
        error : err => console.log(err)
      })
  }


  ngOnInit(): void {
    this.listInactivatedUsers();

  }

  handleGoToPage(page: number) {
    this.appState.dataState.currentPage = page;
    this.listInactivatedUsers()
  }

  validateOperation(id :number) {
    this.showValidation = true;
    this.idUser = id;
  }

  enableAccount() {
    this.customerService.activateUser(this.idUser).subscribe({
      next : resp => {
        this.showValidation = false;
        this.listInactivatedUsers();
      },
      error : err => console.log(err)
    })
  }
}
