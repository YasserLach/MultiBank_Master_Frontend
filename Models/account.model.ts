import {Customer} from "./customer.model";

export interface Account {
  id:number,
  createdAt : Date,
  balance : number,
  currency: string,
  status:boolean,
  customer:Customer,
  overDraft:number,
  interestRate:number
}
