import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomersService} from "../services/customers.service";
import {Customer} from "../../../Models/customer.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit{

  counter : number = 1;
  errorMsg : string ="";
  successMsg : boolean = false;

  registrationForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z]+')]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z]+')]),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern('^0(6|7)[0-9]{8}')]),
    age: new FormControl(0,[Validators.required,Validators.pattern(`^[0-9]{1,3}$`)]),
    sexe: new FormControl('',[Validators.required]),
    instagram: new FormControl(''),
    facebook: new FormControl(''),
    tiktok: new FormControl(''),
    localisation: new FormControl('',[Validators.required]),
    userName: new FormControl('',[Validators.required,Validators.minLength(5)]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(7)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.minLength(7)]),
  })

  constructor(private customerService:CustomersService,private router: Router) {
  }
  ngOnInit(): void {

  }

  addToCounter(counter: number) {
    this.counter++;
  }

  minusToCounter(counter: number) {
    this.counter--;
  }

  registerUser() {
    if (this.registrationForm.valid) {
      if(this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
        console.log(this.registrationForm.value);
        this.customerService.addNewCustomer(this.registrationForm.value as Customer).subscribe({
          next : resp => {
            this.successMsg = true;
          },
          error : err => console.log(err)
        })
      } else {
        console.log(this.errorMsg.length)
        this.errorMsg = "Not the same password"
      }

    }

  }

  navigateSuccess() {
    this.successMsg = false;
    this.router.navigate(['/login'])
  }
}
