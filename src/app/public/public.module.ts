import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [
    PublicComponent,
  ],
  imports: [
    PublicRoutingModule,
  ],
  providers: [],
})
export class PublicModule { }
