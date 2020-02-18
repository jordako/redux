import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { I18nService } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-header' },
})
export class HeaderComponent {
  menuHidden = true;

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
    private router: Router,
    private i18nService: I18nService,
  ) {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    // TODO
    this.router.navigate(['/auth/login']);
  }
}
