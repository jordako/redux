import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-auth-register' },
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onRegister() {
    if (this.registerForm.invalid) { return; }

    // TODO start loading

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password)
      .then(() => {
        // TODO stop loading
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.snackBar.open(error.message, this.translate.instant('auth.login.close'), {
          duration: 5000,
        });
      });
  }

  private createForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
