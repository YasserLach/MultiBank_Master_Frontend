import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{

  showPsswd : boolean = false;
  errorMsg : boolean =false;
  notActivated :boolean = false;

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password: new FormControl('',Validators.required),
  })


  constructor(private authService : AuthService,private route : Router) {
  }



  ngOnInit(): void {
    this.authService.loadJwtTokenFromLocalStorage()
  }

  submitForm() {
    if(this.loginForm.valid) {
      let username  = this.loginForm.value.username as string;
      let password  = this.loginForm.value.password as string;
      this.authService.login(username,password).subscribe({
        next : resp => {
          const expectedResponse = {
            "none-activated": "your account has not been activated yet!"
          };

          if (JSON.stringify(resp) === JSON.stringify(expectedResponse)) {
            this.notActivated = true;
          }else {
            this.notActivated = false;
            this.errorMsg = false;
            this.authService.loadProfile(resp);
            if (this.authService.roles ==="ROLE_USER") {
              this.route.navigateByUrl("/user")
            }
            if (this.authService.roles ==="ROLE_ADMIN") {
              this.route.navigateByUrl("/admin")
            }
          }


        },
        error : err => {
          this.errorMsg = true;
          console.log(this.errorMsg)
        }
      })
    }
  }


}
