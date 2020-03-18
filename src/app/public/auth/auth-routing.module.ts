import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LoginPage,
  RegisterPage,
} from './pages';

const routes: Routes = [{
  path: 'login',
  component: LoginPage,
  data: { title: 'login' },
}, {
  path: 'register',
  component: RegisterPage,
  data: { title: 'register' },
}, {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
