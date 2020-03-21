import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IncomeAndExpensesRoutingModule } from './income-and-expenses-routing.module';
import { IncomeAndExpensesService } from './services/income-and-expenses.service';

// Components
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

// Pages
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
    ReactiveFormsModule,
    IncomeAndExpensesRoutingModule,
    // Components
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  exports: [
    PAGES,
  ],
  providers: [
    IncomeAndExpensesService,
  ],
})
export class IncomeAndExpensesModule { }
