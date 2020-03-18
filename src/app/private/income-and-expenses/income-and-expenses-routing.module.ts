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
  data: { title: 'income-and-expenses.dashboard' },
}, {
  path: 'list',
  component: ListPage,
  data: { title: 'income-and-expenses.list' },
}, {
  path: 'new',
  component: NewPage,
  data: { title: 'income-and-expenses.new' },
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
