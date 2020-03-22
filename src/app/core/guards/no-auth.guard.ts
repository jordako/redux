import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/public/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanLoad {

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  canActivate() {
    const isNoAuthSubs = this.authService.isNoAuth();

    isNoAuthSubs.subscribe(isNoAuth => {
      if (!isNoAuth) {
        this.router.navigate(['/']);
      }
    });

    return isNoAuthSubs;
  }

  canLoad() {
    const isNoAuthSubs = this.authService.isNoAuth().pipe(
      take(1),
    );

    isNoAuthSubs.subscribe(isNoAuth => {
      if (!isNoAuth) {
        this.router.navigate(['/']);
      }
    });

    return isNoAuthSubs;
  }
}
