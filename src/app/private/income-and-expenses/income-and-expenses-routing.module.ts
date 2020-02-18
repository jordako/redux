import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  DashboardPage,
  ListPage,
  NewPage,
} from './pages';

const routes: Routes = [{
  path: 'dashboard',
  component: DashboardPage,
}, {
  path: 'list',
  component: ListPage,
}, {
  path: 'new',
  component: NewPage,
}, {
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeAndExpensesRoutingModule { }
