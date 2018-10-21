import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Products } from '../models/products';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Array<Products> = [];

  constructor (private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('tbProducts'));
  }

  deleteProduct(index) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.products.splice(index, 1);
        localStorage.setItem('tbProducts', JSON.stringify(this.products));
        this.messageService.add({key: 'toastDelete', severity: 'success', summary: 'Success', detail: 'Product deleted!'});
      }
    });
  }
}
