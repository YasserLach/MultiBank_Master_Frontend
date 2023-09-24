import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CustomersComponent } from './customers/customers.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AccountsComponent } from './accounts/accounts.component';
import { UserComponent } from './user/user.component';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { UserOpperationsComponent } from './user-opperations/user-opperations.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { InactiveCustomersComponent } from './inactive-customers/inactive-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    CustomersComponent,
    AccountsComponent,
    UserComponent,
    UserAccountsComponent,
    UserOpperationsComponent,
    UserProfileComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    ForgotPasswordComponent,
    NotAuthorizedComponent,
    InactiveCustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass :AppHttpInterceptor,multi :true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
