import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
}, {
  path: '',
  loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
}, /*, { TODO crear componente de página no encontrada
  path: '**',
  component: NotFoundPage,
}*/];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
