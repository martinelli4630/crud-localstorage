import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpModule } from '@angular/http';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormComponent } from './form.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { NgxCurrencyModule } from 'ngx-currency';
import { Observable } from 'rxjs';


describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        RouterTestingModule.withRoutes([]),

        TableModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        ConfirmDialogModule,
        DropdownModule,
        InputTextModule,
        CheckboxModule,
        CalendarModule,
        KeyFilterModule,
        ButtonModule,
        NgxCurrencyModule
      ],
      declarations: [ FormComponent ],
      providers: [MessageService, ConfirmationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(function() {
    localStorage.clear();
  });

  it('should be create the component', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should verify the price input', () => {
    component.formGroup.controls['price'].setValue('0,00');

    component.verifyPrice({value: '0,00'});
    expect(component.formGroup.controls['price'].value).toBe('');
  });

  it('should verify unit to change abbreviation and type of input', () => {
    component.changeUnit({value: null});
    expect(component.abbreviationUnit).toBe('');
    expect(component.amountDisabled).toBe(true);
    expect(component.keyAmount).toBe('');

    component.changeUnit({value: {abbreviation: 'lt'}});
    expect(component.abbreviationUnit).toBe('lt');
    expect(component.amountDisabled).toBeNull();
    expect(component.keyAmount).toBe('money');

    component.changeUnit({value: {abbreviation: 'un'}});
    expect(component.abbreviationUnit).toBe('un');
    expect(component.amountDisabled).toBeNull();
    expect(component.keyAmount).toBe('pint');
  });

  it('should verify validators of expirationDate', () => {
    expect(component.formGroup.controls['expirationDate'].errors).toBeNull();

    component.changeIsPerishable(true);
    expect(component.formGroup.controls['expirationDate'].errors).toEqual({required: true});

    component.changeIsPerishable(false);
    expect(component.formGroup.controls['expirationDate'].errors).toBeNull();
  });

  it('should verify if validate date is valid', () => {
    expect(component.msgs.length).toEqual(0);

    component.formGroup.controls['dateManufacture'].setValue(new Date());
    component.validDate(new Date('10/05/2016'));
    expect(component.msgs.length).toEqual(1);
    expect(component.formGroup.controls['expirationDate'].value).toBe('');

    component.validDate(new Date());
    expect(component.msgs.length).toEqual(0);
  });

  it('should set values on formGroup', () => {
    const item = [{
      name: 'name',
      unitMeasurement: {id: 2, name: 'Kilogram', abbreviation: 'kg'},
      amount: 32,
      price: 20.00,
      isPerishable: true,
      expirationDate: new Date('10/11/2090'),
      dateManufacture: new Date('10/11/2000')
    }];

    localStorage.setItem('tbProducts', JSON.stringify(item));

    component.ngOnInit();
    component.idEdit = 0;
    component.setValuesForm();
    expect(component.formGroup.valid).toEqual(true);
  });

  it('should set save product', () => {
    const item = [{
      name: 'name',
      unitMeasurement: {id: 2, name: 'Kilogram', abbreviation: 'kg'},
      amount: 32,
      price: 20.00,
      isPerishable: true,
      expirationDate: '2090-10-11T03:00:00.000Z',
      dateManufacture: '2000-10-11T03:00:00.000Z'
    }];

    component.ngOnInit();

    component.save();
    expect(JSON.parse(localStorage.getItem('tbProducts'))).toEqual(null);

    component.formGroup.controls.name.setValue(item[0].name);
    component.formGroup.controls.unitMeasurement.setValue(item[0].unitMeasurement);
    component.formGroup.controls.amount.setValue(item[0].amount);
    component.formGroup.controls.price.setValue(item[0].price);
    component.formGroup.controls.isPerishable.setValue(item[0].isPerishable);
    component.formGroup.controls.expirationDate.setValue(item[0].expirationDate);
    component.formGroup.controls.dateManufacture.setValue(item[0].dateManufacture);

    component.save();
    expect(JSON.parse(localStorage.getItem('tbProducts'))).toEqual(item);
  });

  it('should set update product', () => {
    const item = [{
      name: 'name',
      unitMeasurement: {id: 2, name: 'Kilogram', abbreviation: 'kg'},
      amount: 32,
      price: 20.00,
      isPerishable: true,
      expirationDate: '2090-10-11T03:00:00.000Z',
      dateManufacture: '2000-10-11T03:00:00.000Z'
    }];

    const item2 = [{
      name: 'name2',
      unitMeasurement: {id: 2, name: 'Kilogram', abbreviation: 'kg'},
      amount: 32,
      price: 20.00,
      isPerishable: true,
      expirationDate: '2090-10-11T03:00:00.000Z',
      dateManufacture: '2001-10-11T03:00:00.000Z'
    }];

    component.ngOnInit();
    component.idEdit = 0;
    localStorage.setItem('tbProducts', JSON.stringify(item));
    component.setValuesForm();

    component.formGroup.controls.name.setValue(item2[0].name);
    component.formGroup.controls.dateManufacture.setValue(item2[0].dateManufacture);

    component.update();
    expect(JSON.parse(localStorage.getItem('tbProducts'))).toEqual(item2);
  });
});
