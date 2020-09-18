import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/public/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap((isAuth: boolean) => {
          if (!isAuth) {
            this.router.navigate(['/auth/login']);
          }
        }),
      );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        take(1),
        tap((isAuth: boolean) => {
          if (!isAuth) {
            this.router.navigate(['/auth/login']);
          }
        }),
      );
  }
}
