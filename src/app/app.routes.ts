import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CibcLoginComponent } from './cibc-pages/cibc-login/cibc-login.component';
import { CibcHomeComponent } from './cibc-pages/cibc-home/cibc-home.component';
import { CibcBillPaymentComponent } from './cibc-pages/cibc-bill-payment/cibc-bill-payment/cibc-bill-payment.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cibc-login', component: CibcLoginComponent },
  { path: 'cibc-home', component: CibcHomeComponent },
  { path: 'cibc-bill-payment', component: CibcBillPaymentComponent }
];
