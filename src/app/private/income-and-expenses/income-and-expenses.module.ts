import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { IncomeAndExpensesRoutingModule } from './income-and-expenses-routing.module';
import { IncomeAndExpensesService } from './services/income-and-expenses.service';
import {
  DashboardPage,
  ListPage,
  NewPage,
} from './pages';

const PAGES = [
  DashboardPage,
  ListPage,
  NewPage,
];

@NgModule({
  declarations: [
    PAGES,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    IncomeAndExpensesRoutingModule,
  ],
  exports: [
    PAGES,
  ],
  providers: [
    IncomeAndExpensesService,
  ],
})
export class IncomeAndExpensesModule { }
