import { createReducer, on } from '@ngrx/store';
import { IncomeAndExpenseModel } from 'src/app/shared/models';
import { setItems, unSetItems } from './income-and-expenses.actions';

export interface State {
  items: IncomeAndExpenseModel[];
}

export const initialState: State = {
  items: [],
};

const _incomeAndExpensesReducer = createReducer(initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, state => ({ ...state, items: [] })),

);

export function incomeAndExpensesReducer(state, action) {
  return _incomeAndExpensesReducer(state, action);
}
