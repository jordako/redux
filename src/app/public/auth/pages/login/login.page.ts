import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { State } from '../../../../shared/store/ui/ui.reducer';
import * as uiActions from '../../../../shared/store/ui/ui.actions';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-auth-login' },
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  get isLoading(): Observable<boolean> {
    return this.store.select('ui')
      .pipe(
        map((state: State) => state.isLoading),
      );
  }

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  onLogin() {
    if (this.loginForm.invalid) { return; }

    this.store.dispatch(uiActions.startLoading());

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .then(() => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(uiActions.stopLoading());
        this.snackBar.open(error.message, this.translate.instant('auth.login.close'), {
          duration: 5000,
        });
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
