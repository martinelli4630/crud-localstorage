import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent, BreadcrumbComponent, HomeComponent, MenuComponent } from '../';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ToastModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    BreadcrumbComponent,
    MenuComponent
  ],
  providers: [MessageService]
})
export class HomeModule { }
