import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionLike } from 'rxjs';

import { environment } from '../environments/environment';

import { AppService } from './app.service';
import { I18nService } from './core/i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-root' },
})
export class AppComponent implements OnInit, OnDestroy {
  titleSubscription: SubscriptionLike;

  constructor(
    private appService: AppService,
    private i18nService: I18nService,
    private titleService: Title,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    // Change page title
    this.titleSubscription = this.appService.onChangePage()
      .subscribe(data => {
        const title = data.title;
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
    this.titleSubscription.unsubscribe();
  }
}
