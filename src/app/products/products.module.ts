import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ProductsRoutingModule } from './products.routing.module';
import { FormComponent } from './form/form.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { NgxCurrencyModule } from 'ngx-currency';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    CalendarModule,
    KeyFilterModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ConfirmDialogModule,

    NgxCurrencyModule
  ],
  declarations: [
    ListComponent,
    FormComponent
  ],
  providers: [MessageService, ConfirmationService]
})
export class ProductsModule { }
