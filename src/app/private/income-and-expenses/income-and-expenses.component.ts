import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { SubscriptionLike } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as incomeAndExpensesActions from './store/income-and-expenses.actions';

import { IncomeAndExpensesService } from './services/income-and-expenses.service';

@Component({
  selector: 'app-income-and-expenses',
  templateUrl: './income-and-expenses.component.html',
  styleUrls: ['./income-and-expenses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-income-and-expenses' },
})
export class IncomeAndExpensesComponent implements OnInit, OnDestroy {
  userSubscription: SubscriptionLike;
  incomeAndExpensesSubscription: SubscriptionLike;

  constructor(
    private store: Store<AppState>,
    private incomeAndExpensesService: IncomeAndExpensesService,
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(({ user }) => user !== null),
      )
      .subscribe(({ user }) => {
        this.incomeAndExpensesSubscription = this.incomeAndExpensesService.initIncomeAndExpensesListener(user.uid)
          .subscribe(incomeAndExpenses => {
            this.store.dispatch(incomeAndExpensesActions.setItems({ items: incomeAndExpenses }));
          });
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.incomeAndExpensesSubscription.unsubscribe();
  }
}
