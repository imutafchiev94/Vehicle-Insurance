import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InsuranceService } from 'src/app/services/insurance.service';
import { Insurance } from '../../models/Insurance';
import { of } from 'rxjs';
import { AllInsurancesComponent } from './all-insurances.component';
import { Vehicle } from 'src/app/models/Vehicle';
import { Owner } from 'src/app/models/Owner';

describe('AllInsurancesComponent', () => {
  let component: AllInsurancesComponent;
  let fixture: ComponentFixture<AllInsurancesComponent>;

  let insurances = [{
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
  payments:[]
  }, {
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
  payments:[]
  }] as Array<Insurance>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ 
        AllInsurancesComponent 
      ],
      providers: [
        InsuranceService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get all insurances', () => {
    const service = fixture.debugElement.injector.get(InsuranceService);
    spyOn(service, "getAllInsurances").and.returnValue(of(insurances));
    component.fetchDataInsurance();
    expect(component.insurances).toEqual(insurances);
    expect(component.insurances.length).toEqual(2);
  });
});
