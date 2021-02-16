import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IncomeAndExpenseModel } from 'src/app/shared/models';
import { IncomeAndExpensesService } from '../../services/income-and-expenses.service';

@Component({
  selector: 'app-incoming-and-expenses-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-incoming-and-expenses-list' },
})
export class ListPage implements OnInit {
  displayedColumns: string[] = ['description', 'amount', 'type', 'actions'];
  incomeAndExpenses$: Observable<MatTableDataSource<IncomeAndExpenseModel>>;
  dataSource: MatTableDataSource<IncomeAndExpenseModel>;

  constructor(
    private store: Store<AppState>,
    private incomeAndExpensesService: IncomeAndExpensesService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.incomeAndExpenses$ = this.store.select('incomeAndExpenses').pipe(
      map(({ items }) => new MatTableDataSource(items)),
    );
  }

  onDelete(uid: string) {
    this.incomeAndExpensesService.delete(uid)
      .then(() => {
        this.snackBar.open(
          this.translate.instant('income-and-expenses.delete.success'),
          this.translate.instant('income-and-expenses.delete.close'),
        { duration: 5000 });
      })
      .catch(error => {
        this.snackBar.open(
          error.message,
          this.translate.instant('income-and-expenses.delete.close'),
        { duration: 5000 });
      });
  }
}
