import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import * as uiActions from '../../../../shared/store/ui/ui.actions';

import { IncomeAndExpenseModel } from '../../../../shared/models/income-and-expense.model';
import { IncomeAndExpensesService } from '../../services/income-and-expenses.service';

@Component({
  selector: 'app-incoming-and-expenses-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-incoming-and-expenses-new' },
})
export class NewPage implements OnInit {
  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  newForm: FormGroup;

  get isLoading(): Observable<boolean> {
    return this.store.select('ui')
      .pipe(
        map(({ isLoading }) => isLoading),
      );
  }

  constructor(
    private formBuilder: FormBuilder,
    private incomeAndExpensesService: IncomeAndExpensesService,
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onAdd() {
    if (this.newForm.invalid) { return; }

    this.store.dispatch(uiActions.startLoading());

    const { description, amount, type } = this.newForm.value;
    const incomeAndExpense = new IncomeAndExpenseModel(description, amount, type);

    this.incomeAndExpensesService.add(incomeAndExpense)
      .then(() => {
        this.store.dispatch(uiActions.stopLoading());
        this.formDirective.resetForm();
        this.snackBar.open(
          this.translate.instant('income-and-expenses.new.success'),
          this.translate.instant('income-and-expenses.new.close'),
        { duration: 5000 });
      })
      .catch(error => {
        this.store.dispatch(uiActions.stopLoading());
        this.snackBar.open(
          error.message,
          this.translate.instant('income-and-expenses.new.close'),
        { duration: 5000 });
      });
  }

  private createForm() {
    this.newForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      type: 'income',
    });
  }
}
