import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', redirectTo: 'list' },
    {
      path: 'list',
      component: ListComponent,
      data: {
        breadcrumb: 'Products list'
      }
    },
    {
      path: 'new',
      component: FormComponent,
      data: {
        breadcrumb: 'New Product'
      }
    },
    {
      path: 'edit/:id',
      component: FormComponent,
      data: {
        breadcrumb: 'Edit Product'
      }
    },
    { path: '**', redirectTo: '' }

  ])],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
