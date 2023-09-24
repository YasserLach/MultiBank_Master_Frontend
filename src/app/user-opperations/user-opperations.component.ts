import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OperationsService} from "../services/operations.service";
import {AppStateService} from "../services/app-state.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-opperations',
  templateUrl: './user-opperations.component.html',
  styleUrls: ['./user-opperations.component.css']
})
export class UserOpperationsComponent implements OnInit{

  accountId : string="";
  creditShown : boolean = false;
  debitShown : boolean = false;
  transfertShown:boolean = false;
  public creditForm!:FormGroup;
  public debitForm!:FormGroup;
  public transfertForm!:FormGroup;

  constructor(private formBuilder:FormBuilder,private route: ActivatedRoute,private operationService:OperationsService,public appState:AppStateService) { }


  getListOperations(){
    this.operationService.getOperationsDetails(this.accountId,this.appState.dataState.currentPage,this.appState.dataState.pageSize)
      .subscribe({
        next : resp => {
          this.appState.dataState.operations = resp;
          console.log(this.appState.dataState.operations)
        },
        error : err => console.log(err)
      })
  }

  listAccountInfos(){
    this.operationService.getAccountDetails(this.accountId)
      .subscribe({
        next : resp => {
          this.appState.dataState.accounts = resp
        },
        error : err => console.log(err)
      })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
    this.creditForm =this.formBuilder.group({
      accountId : this.formBuilder.control('',[Validators.required]),
      solde: this.formBuilder.control(0.0,[Validators.required])
    });
    this.debitForm = this.formBuilder.group({
      accountId : this.formBuilder.control('',[Validators.required]),
      solde: this.formBuilder.control(0.0,[Validators.required])
    });
    this.transfertForm = this.formBuilder.group({
      accountSource : this.formBuilder.control('',[Validators.required]),
      accountDestination : this.formBuilder.control('',[Validators.required]),
      solde : this.formBuilder.control(0.0,[Validators.required])
    })
    this.appState.dataState.currentPage = 0;
    this.listAccountInfos();
    this.getListOperations();

  }

  handleGoToPage(page: number) {
    this.appState.dataState.currentPage = page;
    this.getListOperations()
  }

  credit() {
    let creditInfos = this.creditForm.value;
    this.operationService.credit(creditInfos.accountId,creditInfos.solde).subscribe({
      next : resp => {
        this.listAccountInfos();
        this.getListOperations();
        this.creditShown = false;
      },
      error : err => console.log(err)
    })
  }

  debit() {
    let debitInfos = this.debitForm.value;
    this.operationService.debit(debitInfos.accountId,debitInfos.solde).subscribe({
      next : resp => {
        this.listAccountInfos();
        this.getListOperations();
        this.debitShown = false;
      },
      error : err => console.log(err)
    })
  }
  transfert() {
    let transfertInfos = this.transfertForm.value;
    this.operationService.transfert(transfertInfos.accountSource,transfertInfos.accountDestination,transfertInfos.solde).subscribe({
      next : resp => {
        this.listAccountInfos();
        this.getListOperations();
        this.transfertShown = false;
      },
      error : err => console.log(err)
    })
  }
}
