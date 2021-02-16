import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeAndExpensesComponent } from './income-and-expenses.component';

import {
  DashboardPage,
  ListPage,
  NewPage,
} from './pages';

const routes: Routes = [{
  path: '',
  component: IncomeAndExpensesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardPage,
    data: { title: 'income-and-expenses.dashboard.title' },
  }, {
    path: 'list',
    component: ListPage,
    data: { title: 'income-and-expenses.list.title' },
  }, {
    path: 'new',
    component: NewPage,
    data: { title: 'income-and-expenses.new.title' },
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeAndExpensesRoutingModule { }
