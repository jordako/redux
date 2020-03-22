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
}, /*, { TODO crear componente de página no encontrada
  path: '**',
  component: NotFoundPage,
}*/];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
