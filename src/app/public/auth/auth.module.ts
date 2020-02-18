import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {
  LoginPage,
  RegisterPage,
} from './pages';

const PAGES = [
  LoginPage,
  RegisterPage,
];

@NgModule({
  declarations: [
    PAGES,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  exports: [
    PAGES,
  ],
})
export class AuthModule { }
