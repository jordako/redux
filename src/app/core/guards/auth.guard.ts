import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/public/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    const isAuthSubs = this.authService.isAuth();

    isAuthSubs.subscribe(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth/login']);
      }
    });

    return isAuthSubs;
  }

  canLoad() {
    const isAuthSubs = this.authService.isAuth().pipe(
      take(1),
    );

    isAuthSubs.subscribe(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/auth/login']);
      }
    });

    return isAuthSubs;
  }
}
