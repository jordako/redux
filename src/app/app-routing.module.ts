import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
  canActivate: [ AuthGuard ],
}, {
  path: '',
  loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  canActivate: [ NoAuthGuard ],
}, {
  path: '**',
  redirectTo: '',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
