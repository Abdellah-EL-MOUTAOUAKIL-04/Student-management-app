import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {StudentsComponent} from "./students/students.component";
import {PaymentsComponent} from "./payments/payments.component";
import {LoadPaymentsComponent} from "./load-payments/load-payments.component";
import {LoadStudentsComponent} from "./load-students/load-students.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {StudentDetailsComponent} from "./student-details/student-details.component";
import {NewPaymentComponent} from "./new-payment/new-payment.component";
import {PaymentDetailsComponent} from "./payment-details/payment-details.component";

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"admin",component:AdminTemplateComponent,canActivate:[AuthGuard],children:[
      {path:"home",component:HomeComponent},
      {path:"profile",component:ProfileComponent},
      {path:"dashboard",component:DashboardComponent},
      {path:"students",component:StudentsComponent},
      {path:"payments",component:PaymentsComponent},
      {path:"student-details/:code",component:StudentDetailsComponent},
      {path:"new-payment/:code",component:NewPaymentComponent},
      {path:"payment-details/:id",component:PaymentDetailsComponent},
      {path:"loadPayments",component:LoadPaymentsComponent,canActivate:[AuthorizationGuard],data:{roles:['ADMIN']}},
      {path:"loadStudents",component:LoadStudentsComponent,canActivate:[AuthorizationGuard],data:{roles:['ADMIN']}},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
