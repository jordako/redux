import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { incomeAndExpensesReducer } from './store/income-and-expenses.reducer';

import { IncomeAndExpensesRoutingModule } from './income-and-expenses-routing.module';
import { IncomeAndExpensesComponent } from './income-and-expenses.component';
import { IncomeAndExpensesService } from './services/income-and-expenses.service';

// Components
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule, ThemeService } from 'ng2-charts';

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
    IncomeAndExpensesComponent,
    PAGES,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeAndExpenses', incomeAndExpensesReducer),
    TranslateModule,
    ReactiveFormsModule,
    IncomeAndExpensesRoutingModule,
    // Components
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    ChartsModule,
  ],
  exports: [
    PAGES,
  ],
  providers: [
    IncomeAndExpensesService,
    ThemeService,
  ],
})
export class IncomeAndExpensesModule { }
