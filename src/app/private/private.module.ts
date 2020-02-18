import { NgModule } from '@angular/core';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

// Components
import { HeaderModule } from '../shared/components';

@NgModule({
  declarations: [
    PrivateComponent,
  ],
  imports: [
    PrivateRoutingModule,
    // Components
    HeaderModule,
  ],
  providers: [],
})
export class PrivateModule { }
