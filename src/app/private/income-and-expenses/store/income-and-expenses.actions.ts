import { createAction, props } from '@ngrx/store';

import { IncomeAndExpenseModel } from '../../../shared/models/income-and-expense.model';

export const setItems = createAction(
  '[Income and expenses] Set items',
  props<{ items: IncomeAndExpenseModel[] }>(),
);

export const unSetItems = createAction('[Income and expenses] Unset items');


