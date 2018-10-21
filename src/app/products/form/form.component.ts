import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formGroup: FormGroup;
  abbreviationUnit: string;
  amountDisabled: boolean;
  keyAmount: string;
  submitted: boolean;
  idEdit: number;

  maxDate: Date;
  dateFormat: string;
  msgs: Array<any>;

  optionCurreny = { prefix: '', thousands: '.', decimal: ',' };
  units = [
    {label: 'Select...', value: null},
    {label: 'Liter', value: { id: 1, name: 'Liter', abbreviation: 'lt' }},
    {label: 'Kilogram', value: {id: 2, name: 'Kilogram', abbreviation: 'kg'} },
    {label: 'Unity', value: {id: 3, name: 'Unity', abbreviation: 'un'} }
  ];

  constructor (
    private _location: Location,
    private router: Router,
    public routerActive: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService) {
      this.abbreviationUnit = '';
      this.amountDisabled = true;
      this.submitted = false;
      this.maxDate = new Date();
      this.dateFormat = 'dd/mm/yy';
      this.msgs = [];
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      'name': ['', Validators.required],
      'unitMeasurement': ['', Validators.required],
      'amount': ['', Validators.pattern(/^[0-9]+(.[0-9]{0,3})?$/)],
      'price': ['', Validators.required],
      'isPerishable': [''],
      'expirationDate': [''],
      'dateManufacture': ['', Validators.required]
    });

    this.routerActive.params
    .subscribe((params: Params) => {
      this.idEdit = params.id;
      this.amountDisabled = null;
      this.idEdit ? this.setValuesForm() : this.idEdit = null;

    });
  }

  verifyPrice(price) {
    if (price.value === '0,00') {
      this.formGroup.controls.price.setValue('');
    }
  }

  setValuesForm() {
    const product = JSON.parse(localStorage.getItem('tbProducts'));
    const expirationDate = product[this.idEdit].expirationDate ? new Date(product[this.idEdit].expirationDate) : '';
    const dateManufacture = product[this.idEdit].dateManufacture ? new Date(product[this.idEdit].dateManufacture) : '';

    this.formGroup.controls.name.setValue(product[this.idEdit].name);
    this.formGroup.controls.unitMeasurement.setValue(product[this.idEdit].unitMeasurement);
    this.formGroup.controls.amount.setValue(product[this.idEdit].amount);
    this.formGroup.controls.price.setValue(product[this.idEdit].price);
    this.formGroup.controls.isPerishable.setValue(product[this.idEdit].isPerishable);
    this.formGroup.controls.expirationDate.setValue(expirationDate);
    this.formGroup.controls.dateManufacture.setValue(dateManufacture);
  }

  save() {
    this.submitted = true;
    if (this.formGroup.valid) {
      const products = JSON.parse(localStorage.getItem('tbProducts'));
      let newList = [];
      if (products) {
        products.push(this.formGroup.value);
        newList = products;
      } else {
        newList.push(this.formGroup.value);
      }

      localStorage.setItem('tbProducts', JSON.stringify(newList));
      this.messageService.add({key: 'toast', life: 900, severity: 'success', summary: 'Success', detail: 'Product saved!'});
      this.delay(1100);
    }
  }

  update() {
    this.submitted = true;
    if (this.formGroup.valid) {
      const products = JSON.parse(localStorage.getItem('tbProducts'));
      products[this.idEdit] = this.formGroup.value;

      localStorage.setItem('tbProducts', JSON.stringify(products));
      this.messageService.add({key: 'toast', life: 900, severity: 'success', summary: 'Success', detail: 'Product updated!'});
      this.delay(1100);
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => this.router.navigate(['/products/list']));
  }

  cancel() {
    this._location.back();
  }

  validDate(dateSelected) {
    const today = new Date();
    this.maxDate = dateSelected;

    if (dateSelected < today) {
      this.msgs = [{ severity: 'warn', summary: 'Warning', detail: 'This product is expired.'}];
      this.formGroup.controls.dateManufacture.setValue('');
    } else {
      this.msgs = [];
    }
  }

  changeUnit(event) {
    this.abbreviationUnit = event.value ? event.value.abbreviation : '';
    this.amountDisabled = event.value ? null : true;
    this.keyAmount = event.value ? event.value.abbreviation === 'un' ? 'pint' : 'money' : '';
  }

  changeIsPerishable(event) {

    event ?
      this.formGroup.controls.expirationDate.setValidators([Validators.required]) :
      this.formGroup.controls.expirationDate.clearValidators();

    this.formGroup.controls['expirationDate'].updateValueAndValidity();
  }
}
