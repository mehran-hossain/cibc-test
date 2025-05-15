import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CibcLoginComponent } from './cibc-login/cibc-login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cibc-login', component: CibcLoginComponent }
];
