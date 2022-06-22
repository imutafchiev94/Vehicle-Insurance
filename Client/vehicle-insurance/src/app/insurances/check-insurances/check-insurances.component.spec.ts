import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialExampleModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CheckInsurancesComponent } from './check-insurances.component';
import { Insurance } from 'src/app/models/Insurance';
import { Owner } from 'src/app/models/Owner';
import { Vehicle } from 'src/app/models/Vehicle';
import { InsuranceService } from 'src/app/services/insurance.service';
import { HttpClient } from '@angular/common/http';

fdescribe('CheckInsurancesComponent', () => {
  let component: CheckInsurancesComponent;
  let fixture: ComponentFixture<CheckInsurancesComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let vehicle = {
    "brand": "Citroen",
    "model": "C4",
    "yearOfManufacture": 2015,
    "registrationNumber": "CT8619K"
  } as Vehicle

  let owner = {
      firstName: "Gosho",
      middleName: "",
      surname: "Kueilio",
      age: 25,
      dateOfBirth:  new Date('2000-05-14T21:00:00.000+00:00'),
      gender: "Female",
      EGN: "0045155956",
      vehicles: [
        vehicle,
      ]
  } as Owner
  let insurance = {
  _id: '62ab3cd0efa5ca78a7bab405',
  startDate: new Date('2022-06-16T14:23:10.859+00:00'),
  endDate: new Date('2023-06-16T14:23:10.859+00:00'),
  vehicleOwner: owner,
  vehicle: vehicle,
  imageUrl: "http://res.cloudinary.com/hellios94/image/upload/v1655389391/Vehicle%20Insurance/v7smefzywzxu1bzvc8k4.jpg",
  totalAmount: 186,
  dueAmount: 186,
  countOfPayments: 6,
  isInvalid: false,
  payments:[]
  } as Insurance

  let insuranceCheckForm = {
    vehicleRegistrationNumber: 'CT8619K'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialExampleModule,
        BrowserAnimationsModule
      ],
      declarations: [ 
        CheckInsurancesComponent 
      ],
      providers: [
        InsuranceService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(CheckInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Get inurance by vehicle's registration number", () => {
    component.checkForm.patchValue({'vehicleRegistrationNumber': insuranceCheckForm.vehicleRegistrationNumber});
    const service = new InsuranceService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of(insurance));
    service.findInsurance(component.checkForm.value).subscribe({
      next: (res) => {
        
        expect(res).toEqual(insurance);
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});
