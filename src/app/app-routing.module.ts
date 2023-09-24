import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {UserComponent} from "./user/user.component";
import {UserAccountsComponent} from "./user-accounts/user-accounts.component";
import {UserOpperationsComponent} from "./user-opperations/user-opperations.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegistrationComponent} from "./user-registration/user-registration.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {InactiveCustomersComponent} from "./inactive-customers/inactive-customers.component";

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"admin",component:DashboardComponent,canActivate:[AuthenticationGuard],children : [
      {path:"customers",component:CustomersComponent},
      {path:"accounts",component:AccountsComponent},
      {path:"inactive",component:InactiveCustomersComponent},
    ]},

  {path:"user",component:UserComponent,canActivate:[AuthenticationGuard],children : [
      {path:"accounts",component:UserAccountsComponent,canActivate:[AuthenticationGuard]},
      {path:"profile",component:UserProfileComponent,canActivate:[AuthenticationGuard]},
    ]},

  {path:"login",component:UserLoginComponent},
  {path:"registration",component:UserRegistrationComponent},
  {path:"forgot",component:ForgotPasswordComponent},
  {path:"not-autho",component:NotAuthorizedComponent},
  {path:"user/accounts/:accountId",component:UserOpperationsComponent,canActivate:[AuthenticationGuard]},
  {path:"test",component:TestComponent,canActivate:[AuthenticationGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
