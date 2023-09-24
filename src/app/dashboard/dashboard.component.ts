import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../services/customers.service";
import {AppStateService} from "../services/app-state.service";
import {AccountsService} from "../services/accounts.service";
import {OperationsService} from "../services/operations.service";
import {Chart,registerables} from 'node_modules/chart.js'
Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private customerService:CustomersService, public appState:AppStateService,private accountService:AccountsService,private operationService:OperationsService) {
  }

  labelsPieAccount : Array<any> = [];
  dataPieAccount : Array<any> = [];

  labelsOperations : Array<any> = [];
  dataOperations : Array<any> = [];
  getCustomers() {
    this.customerService.getCustomers()
      .subscribe({
          next : resp => {this.appState.dataState.customers = resp},
          error: err => console.log(err)
      })
  }

  getAccounts() {
    this.accountService.getAccounts()
      .subscribe({
        next : resp => {this.appState.dataState.accounts = resp;
          if(this.appState.dataState.accounts != null) {
            for (let i=0; i<this.appState.dataState.accounts.length;i++) {
              this.labelsPieAccount.push(this.appState.dataState.accounts[i].customerDto.name)
              this.dataPieAccount.push(Math.floor(this.appState.dataState.accounts[i].balance));
            }
          }
        },
        error: err => console.log(err)
      })
  }

  getOpperations() {
    this.operationService.getOperations()
      .subscribe({
        next : resp => {
          this.appState.dataState.operations = resp
          if(this.appState.dataState.operations != null) {
            for (let i=0;i<this.appState.dataState.operations.length;i++) {
              this.dataOperations.push(Math.floor(this.appState.dataState.operations[i].amount));
              this.labelsOperations.push(this.appState.dataState.operations[i].id);
            }
            console.log(resp)
          }
        },
        error: err => console.log(err)
      })
  }

  ngOnInit(): void {
    this.getCustomers();
    this.getAccounts();
    this.getOpperations();
    this.renderChart(this.labelsPieAccount,this.dataPieAccount,'bar','barchart');
    this.renderChart(this.labelsPieAccount,this.dataPieAccount,'line','pichart');
    this.renderOperationChart(this.labelsOperations,this.dataOperations,'line','pichart2');
    this.renderOperationChart(this.labelsOperations,this.dataOperations,'bar','barchart2');
  }

  renderChart(labelsPieAccount:any,dataPieAccount:any,type:any,id:any){
    new Chart(id, {
      type: type,
      data: {
        labels: labelsPieAccount,
        datasets: [{
          label:"",
          data: dataPieAccount,
          borderWidth: 1,
          backgroundColor: [
            'rgba(217,65,0)',
            'rgba(0,133,44)',
            'rgba(255,230,0)',
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderOperationChart(labelsOperations:any,dataOperations:any,type:any,id:any){
    new Chart(id, {
      type: type,
      data: {
        labels: labelsOperations,
        datasets: [{
          label:"",
          data: dataOperations,
          borderWidth: 1,
          backgroundColor: [
            'rgba(217,65,0)',
            'rgba(0,133,44)',
            'rgba(255,230,0)',
          ]
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
