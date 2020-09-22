import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../../shared/models/user.model';

export const setUser = createAction(
  '[Auth] setUser',
  props<{ user: UserModel }>(),
);

export const unsetUser = createAction('[Auth] unsetUser');
