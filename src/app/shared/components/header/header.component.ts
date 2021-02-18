import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, SubscriptionLike } from 'rxjs';

import { I18nService } from 'src/app/core';
import { AuthService } from '../../../public/auth/services/auth.service';
import { AppService } from '../../../app.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-header' },
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav: MatSidenav;

  changePageSubscription: SubscriptionLike;
  private titleSource = new BehaviorSubject<string>(null);
  title$ = this.titleSource.asObservable();

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): Observable<string> {
    return this.store.select('user').pipe(
      filter(({ user }) => user != null),
      map(({ user }) => user.name),
    );
  }

  constructor(
    public authService: AuthService,
    private i18nService: I18nService,
    private router: Router,
    private translate: TranslateService,
    private appService: AppService,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.setTitle();
  }

  ngOnDestroy() {
    this.changePageSubscription.unsubscribe();
  }

  setTitle() {
    this.titleSource.next(this.translate.instant(this.titleService.getTitle()));

    // Change header title
    this.changePageSubscription = this.appService.onChangePage()
      .subscribe(data => {
        const title = data.title;
        if (title) {
          this.titleSource.next(this.translate.instant(title));
        }
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/auth/login']);
      })
      .catch(error => {
        this.snackBar.open(error.message, this.translate.instant('auth.login.close'), {
          duration: 5000,
        });
      });
  }
}
