import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Insurance } from 'src/app/models/Insurance';
import { Owner } from 'src/app/models/Owner';
import { Vehicle } from 'src/app/models/Vehicle';
import { InsuranceService } from 'src/app/services/insurance.service';
import { of } from 'rxjs';
import { InsuranceDetailsComponent } from './insurance-details.component';

fdescribe('InsuranceDetailsComponent', () => {
  let component: InsuranceDetailsComponent;
  let fixture: ComponentFixture<InsuranceDetailsComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        InsuranceDetailsComponent 
      ],
      providers: [
        InsuranceService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsuranceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get insurance details', () => {
    const service = fixture.debugElement.injector.get(InsuranceService);
    spyOn(service, "getInsurance").and.returnValue(of(insurance))
    component.fetchData();
    
    expect(component.insurance).toEqual(insurance);
  });
});
