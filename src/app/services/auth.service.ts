import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;
  roles : any;
  username:any;
  accessToken !:any;
  timeOut :any;

  constructor(private http:HttpClient,private route:Router) { }

  public login(username:string,password:string) {
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params = new HttpParams().set("username",username).set("password",password);
    return this.http.post("http://localhost:8085/token",params,options);
  }


  loadProfile(resp: any) {
    this.isAuthenticated = true;
    this.accessToken = resp['accessToken'];
    let decodeJwt :any = jwtDecode(this.accessToken);
    this.username = decodeJwt.sub;
    this.roles = decodeJwt.scope;
    this.timeOut = decodeJwt.exp;
    window.localStorage.setItem("jwt-token",this.accessToken)
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;
    localStorage.removeItem("jwt-token")
     this.route.navigateByUrl("/login")
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem("jwt-token");
    if (token) {
      console.log("true")
      this.loadProfile({"access-token":token});
      console.log(this.roles)
      if (this.roles ==="ROLE_USER") {
        this.route.navigateByUrl("/user")
      }
      if (this.roles ==="ROLE_ADMIN") {
        this.route.navigateByUrl("/admin")
      }
    }
  }
  expiredJwtToken() {
    let token = window.localStorage.getItem("jwt-token");
    const currentDate = new Date();
    const currentUnixTime = Math.floor(currentDate.getTime() / 1000); // Convert to UNIX timestamp

    if (currentUnixTime < this.timeOut) {
      console.log("Token is not expired.");
    } else {
      this.logout()
    }
  }


}
