import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/store/ui/ui.reducer';
import * as auth from './public/auth/store/auth.reducer';
import * as incomeAndExpenses from './private/income-and-expenses/store/income-and-expenses.reducer';

export interface AppState {
  ui: ui.State;
  user: auth.State;
  incomeAndExpenses: incomeAndExpenses.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  incomeAndExpenses: incomeAndExpenses.incomeAndExpensesReducer,
};
