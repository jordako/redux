import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/public/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanLoad {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isNoAuth()
      .pipe(
        tap((isNoAuth: boolean) => {
          if (!isNoAuth) {
            this.router.navigate(['/']);
          }
        }),
      );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isNoAuth()
      .pipe(
        take(1),
        tap((isNoAuth: boolean) => {
          if (!isNoAuth) {
            this.router.navigate(['/']);
          }
        }),
      );
  }
}
