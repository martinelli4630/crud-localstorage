import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, Response, XHRBackend, RequestMethod, ResponseOptions } from '@angular/http';

import { ListComponent } from './list.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

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
        ConfirmDialogModule
      ],
      declarations: [ ListComponent ],
      providers: [MessageService, ConfirmationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    let store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key: string): String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  afterEach(function() { });

  it('should create the component', () => {
    component.ngOnInit();
    expect(localStorage.getItem('tbProducts')).toBeNull();

    localStorage.setItem('tbProducts', 'product 1');
    expect(localStorage.getItem('tbProducts')).toBe('product 1');
    expect(component).toBeDefined();
  });

  it('should delete a product from product list', () => {
    localStorage.setItem('tbProducts', 'product 1');
    expect(localStorage.removeItem('tbProducts')).toBeUndefined();
    expect(localStorage.getItem('tbProducts')).toBeNull();

  });
});
