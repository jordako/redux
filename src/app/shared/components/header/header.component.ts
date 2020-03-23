import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';

import { I18nService } from 'src/app/core';
import { AuthService } from '../../../public/auth/services/auth.service';

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
    public authService: AuthService,
    private i18nService: I18nService,
    private titleService: Title,
    private router: Router,
  ) {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/auth/login']);
    });
  }
}
