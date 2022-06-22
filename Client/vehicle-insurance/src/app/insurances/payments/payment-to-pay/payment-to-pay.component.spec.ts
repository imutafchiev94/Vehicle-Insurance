import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Insurance } from 'src/app/models/Insurance';
import { Owner } from 'src/app/models/Owner';
import { Payment } from 'src/app/models/Payment';
import { Vehicle } from 'src/app/models/Vehicle';
import { PaymentService } from 'src/app/services/payment.service';
import { of } from 'rxjs';

import { PaymentToPayComponent } from './payment-to-pay.component';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('PaymentToPayComponent', () => {
  let component: PaymentToPayComponent;
  let fixture: ComponentFixture<PaymentToPayComponent>;

  let insurance = {
    _id: '62ab3cd0efa5ca78a7bab405',
    startDate: new Date('2022-06-16T14:23:10.859+00:00'),
    endDate: new Date('2023-06-16T14:23:10.859+00:00'),
    vehicleOwner:  {
      firstName: "Gosho",
      middleName: "",
      surname: "Kueilio",
      age: 25,
      dateOfBirth:  new Date('2000-05-14T21:00:00.000+00:00'),
      gender: "Female",
      EGN: "0045155956",
      vehicles: [
        {
          "brand": "Citroen",
          "model": "C4",
          "yearOfManufacture": 2015,
          "registrationNumber": "CT8619K"
        } as Vehicle,,
      ]
  } as Owner,
    vehicle: {
      "brand": "Citroen",
      "model": "C4",
      "yearOfManufacture": 2015,
      "registrationNumber": "CT8619K"
    } as Vehicle,
    imageUrl: "http://res.cloudinary.com/hellios94/image/upload/v1655389391/Vehicle%20Insurance/v7smefzywzxu1bzvc8k4.jpg",
    totalAmount: 186,
    dueAmount: 186,
    countOfPayments: 6,
    isInvalid: false,
    payments: []
    } as Insurance

    let payments = [{
        _id: '62a98ef5a674918b84cb16d0',
        isPaid: true,
        amount: 31,
        startDate: new Date('2022-06-16T07:49:08.990+00:00'),
        endDate: new Date('2022-06-30T07:49:08.990+00:00'),
        insurance: insurance
    },
    {
        _id: '62a98ef5a674918b84cb16d4',
        isPaid: false,
        amount: 31,
        startDate: new Date('2022-07-16T07:49:08.990+00:00'),
        endDate: new Date('2022-07-30T07:49:08.990+00:00'),
        insurance: insurance
    },
    {
        _id: '62a98ef5a674918b84cb16d8',
        isPaid: false,
        amount: 31,
        startDate: new Date('2022-08-16T07:49:08.990+00:00'),
        endDate: new Date('2022-08-30T07:49:08.990+00:00'),
        insurance: insurance
    },
    {
        _id: '62a98ef5a674918b84cb16dc',
        isPaid: false,
        amount: 31,
        startDate: new Date('2022-09-16T07:49:08.990+00:00'),
        endDate: new Date('2022-09-30T07:49:08.990+00:00'),
        insurance: insurance
    },
    {
        _id: '62a98ef5a674918b84cb16e0',
        isPaid: false,
        amount: 31,
        startDate: new Date('2022-10-16T07:49:08.990+00:00'),
        endDate: new Date('2022-10-30T07:49:08.990+00:00'),
        insurance: insurance
    },
    {
        _id: '62a98ef5a674918b84cb16e4',
        isPaid: false,
        amount: 31,
        startDate: new Date('2022-11-16T07:49:08.990+00:00'),
        endDate: new Date('2022-11-30T07:49:08.990+00:00'),
        insurance: insurance
    }] as Array<Payment>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule,
        ReactiveFormsModule
    ],
      declarations: [ 
        PaymentToPayComponent 
      ],
      providers: [
        PaymentService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get first payment to pay', () => {
    const service = fixture.debugElement.injector.get(PaymentService);
    spyOn(service, "getPaymentToPay").and.returnValue(of(payments[1]));
    component.fetchDataPayments();
    expect(component.payment).toEqual(payments[1]);
    expect(component.payment.isPaid).toEqual(false);
    expect(component.payment._id).toEqual('62a98ef5a674918b84cb16d4');
  });
});
