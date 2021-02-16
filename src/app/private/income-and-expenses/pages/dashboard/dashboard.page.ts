import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AppState } from '../../../../app.reducer';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { MultiDataSet, Label } from 'ng2-charts';

interface IncomeAndExpesesTotals {
  incomes: number;
  expenses: number;
  totalIncomes: number;
  totalExpenses: number;
  balance: number;
}

@Component({
  selector: 'app-incoming-and-expenses-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-incoming-and-expenses-dashboard' },
})
export class DashboardPage implements OnInit {

  incomeAndExpensesTotals$: Observable<IncomeAndExpesesTotals>;

  doughnutChartLabels: Label[] = [
    this.translate.instant('income-and-expenses.dashboard.incomes'),
    this.translate.instant('income-and-expenses.dashboard.expenses'),
  ];

  get doughnutChartData$(): Observable<MultiDataSet> {
    return this.incomeAndExpensesTotals$.pipe(
      map(( {totalIncomes, totalExpenses}) => [[totalIncomes, totalExpenses]]),
    );
  }

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.incomeAndExpensesTotals$ = this.store.select('incomeAndExpenses').pipe(
      map(({ items }) => {
        const incomes = items.filter(item => item.type === 'income');
        const expenses = items.filter(item => item.type === 'expense');
        const totalIncomes = incomes.reduce((acc, current) => acc + current.amount, 0);
        const totalExpenses = expenses.reduce((acc, current) => acc + current.amount, 0);

        return {
          incomes: incomes.length,
          expenses: expenses.length,
          totalIncomes,
          totalExpenses,
          balance: totalIncomes - totalExpenses,
        };
      }),
    );
  }
}
