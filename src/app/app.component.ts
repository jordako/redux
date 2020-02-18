import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { I18nService } from './core/i18n/i18n.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private i18nService: I18nService,
  ) {}

  ngOnInit() {
     // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }
}
