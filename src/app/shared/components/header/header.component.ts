import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { I18nService } from 'src/app/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-header' },
})
export class HeaderComponent {
  @Input() sidenav: MatSidenav;

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

  get title(): string {
    return this.titleService.getTitle();
  }

  constructor(
    private router: Router,
    private i18nService: I18nService,
    private titleService: Title,
  ) {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    // TODO
    this.router.navigate(['/auth/login']);
  }
}
