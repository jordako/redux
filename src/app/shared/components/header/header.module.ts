import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from './header.component';

export { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NgbDropdownModule,
    NgbCollapseModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
