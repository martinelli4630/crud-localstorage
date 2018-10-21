import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main-components';


@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    {
      path: 'products',
      component: HomeComponent,
      children: [
        {
          path: '',
          loadChildren: 'app/products/products.module#ProductsModule',
          data: {
            breadcrumb: 'Products'
          }
        }
      ]
    },
    { path: '**', redirectTo: '' }

  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
