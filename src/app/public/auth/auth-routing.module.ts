import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LoginPage,
  RegisterPage,
} from './pages';

const routes: Routes = [{
  path: 'login',
  component: LoginPage,
  data: { title: 'auth.login.title' },
}, {
  path: 'register',
  component: RegisterPage,
  data: { title: 'auth.register.title' },
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
