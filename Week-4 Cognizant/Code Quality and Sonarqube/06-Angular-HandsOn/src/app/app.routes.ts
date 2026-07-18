import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'accounts', component: AccountListComponent },
  { path: 'create-account', component: AccountFormComponent },
  { path: 'edit-account/:id', component: AccountFormComponent },
  { path: 'loans', component: LoanListComponent },
  { path: 'apply-loan', component: LoanFormComponent }
];
