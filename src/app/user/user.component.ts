import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  offres : Array<any> = [
    {imgSrc:"assets/golf.jpg",title:"RECEIVE A 10% DISCOUNT ON GREEN FEES",subTitle:"GOLF LES DUNES"},
    {imgSrc:"assets/sofitel.jpg",title:"UP TO 15% OFF STAYS AT SOFITEL SENTOSA",subTitle:"SOFITEL SINGAPORE SENTOSA RESORT & SPA"},
    {imgSrc:"assets/zoo.jpg",title:"TARONGA ZOO - VISA INTERNATIONAL COUPLES PASS",subTitle:"TARONGA ZOO"},
    {imgSrc:"assets/bed.jpg",title:"WILDLIFE RETREAT AT TARONGA - VISA ULTIMATE OVERNIGHT STAY",subTitle:"TARONGA ZOO"},
    {imgSrc:"assets/meubles.jpg",title:"GET UP TO 15% OFF BEST AVAILABLE RATES FOR DIRECT ROOM BOOKINGS",subTitle:"GRAND LEXIS PORT DICKSON"},
    {imgSrc:"assets/booking.jpg",title:"UP TO 10% CASHBACK ON BOOKING.COM WHEN YOU PAY WITH VISA",subTitle:"BOOKING.COM"},
    {imgSrc:"assets/far.jpg",title:"SAVE UP TO 25% OFF BEST FLEXIBLE RATES",subTitle:"FAR EAST HOSPITALITY MANAGEMENT (S) PTE LTD"},
    {imgSrc:"assets/sofitel2.jpg",title:"20% OFF GIFT VOUCHERS AT SOFITEL SENTOSA",subTitle:"SOFITEL SINGAPORE SENTOSA RESORT & SPA"},
  ]

  constructor(private authService:AuthService) {
  }
  ngOnInit(): void {
    this.authService.expiredJwtToken()
  }

}
