import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, SubscriptionLike } from 'rxjs';

import { I18nService } from 'src/app/core';
import { AuthService } from '../../../public/auth/services/auth.service';
import { AppService } from '../../../app.service';

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

  get username(): string {
    // TODO
    return 'Username';
  }

  constructor(
    public authService: AuthService,
    private i18nService: I18nService,
    private router: Router,
    private translateService: TranslateService,
    private appService: AppService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.setTitle();
  }

  ngOnDestroy() {
    this.changePageSubscription.unsubscribe();
  }

  setTitle() {
    this.titleSource.next(this.translateService.instant(this.titleService.getTitle()));

    // Change header title
    this.changePageSubscription = this.appService.onChangePage()
      .subscribe(data => {
        const title = data.title;
        if (title) {
          this.titleSource.next(this.translateService.instant(title));
        }
      });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/auth/login']);
    });
  }
}
