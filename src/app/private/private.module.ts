import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

// Components
import { HeaderModule } from '../shared/components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    PrivateRoutingModule,
    FlexLayoutModule,
    // Components
    HeaderModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
})
export class PrivateModule { }
