import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateComponent } from './private.component';

const routes: Routes = [{
  path: '',
  component: PrivateComponent,
  children: [{
    path: 'income-and-expenses',
    loadChildren: () => import('./income-and-expenses/income-and-expenses.module').then(m => m.IncomeAndExpensesModule),
  }, {
    path: '',
    redirectTo: 'income-and-expenses/dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule { }
