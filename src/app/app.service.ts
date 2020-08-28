import { Injectable } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd, Data } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
  ) {}

  onChangePage(): Observable<Data> {
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));

    return merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data),
      );
  }
}
