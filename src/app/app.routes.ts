import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CibcLoginComponent } from './cibc-pages/cibc-login/cibc-login.component';
import { CibcHomeComponent } from './cibc-pages/cibc-home/cibc-home.component';
import { CibcBillPaymentComponent } from './cibc-pages/cibc-bill-payment/bill-payment/cibc-bill-payment.component';
import { CibcAddEditPayeesComponent } from './cibc-pages/cibc-bill-payment/add-edit-payees/cibc-add-edit-payees.component';
import { PayeeSearchResultsComponent } from './cibc-pages/cibc-bill-payment/payee-search-results/payee-search-results.component';
import { PayeeAccountDetailsComponent } from './cibc-pages/cibc-bill-payment/payee-account-details/payee-account-details.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cibc-login', component: CibcLoginComponent },
  { path: 'cibc-home', component: CibcHomeComponent },
  { path: 'cibc-bill-payment', component: CibcBillPaymentComponent },
  { path: 'cibc-add-edit-payees', component: CibcAddEditPayeesComponent },
  { path: 'payee-search-results', component: PayeeSearchResultsComponent },
  { path: 'payee-account-details/:id', component: PayeeAccountDetailsComponent }
];
