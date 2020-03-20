import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

import { AuthRoutingModule } from './auth-routing.module';

// Components
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Pages
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
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule,
    AuthRoutingModule,
    // Components
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    PAGES,
  ],
})
export class AuthModule { }
