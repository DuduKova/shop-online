import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./components/register";
import {LoginPageComponent} from "./components/loginPage";
import {HomeComponent} from "./components/home";
import {AuthGuard} from "./_guards";
import {OrderFormComponent} from "./components/order-form/order-form.component";
import {CompanyDetailsComponent} from "./components/company-details/company-details.component";

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'company', component: CompanyDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
