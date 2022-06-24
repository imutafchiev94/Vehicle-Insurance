import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Accident } from '../../models/Accident';
import { Insurance } from '../../models/Insurance';
import { Owner } from '../../models/Owner';
import { Vehicle } from '../../models/Vehicle';
import { AccidentService } from '../../services/accident.service';
import { MaterialExampleModule } from '../../../material.module';
import { of } from 'rxjs';
import { CheckAccidentComponent } from './check-accident.component';

describe('CheckAccidentComponent', () => {
  let component: CheckAccidentComponent;
  let fixture: ComponentFixture<CheckAccidentComponent>;
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
  let accident = {
    _id: '62b07150bed05e7f29d42f19',
    vehicle: vehicle,
    insurance: insurance,
    driverFirstName: "John",
  driverMiddleName: "",
  driverSurname: "Doe",
  driverEGN: "0145076486",
  dateOfAccident: '2022-06-16T21:00:00.000+00:00',
  imageUrl: 'http://res.cloudinary.com/hellios94/image/upload/v1655730511/Vehicle%20Insurance/xysnamiedndruepzjoqg.jpg',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ultrices mauris, vestibulum venenatis massa. Suspendisse metus turpis, mattis eget augue a, dapibus feugiat leo. Integer bibendum imperdiet lorem. Maecenas maximus, mauris nec cursus scelerisque, nibh mauris tempus felis, a laoreet nulla urna dictum ante. Nulla ut sodales quam, eu tempus nisl. Mauris lobortis leo ornare risus dignissim, non dictum est ultrices. Praesent hendrerit massa quis tortor pretium efficitur. Fusce blandit libero est, a congue ante tempor ut. Proin semper sit amet dolor non ullamcorper. Sed condimentum ipsum non mi pulvinar scelerisque. Cras fringilla nunc et justo blandit ullamcorper. Integer at eros quis elit porttitor dictum.',
  
  } as Accident

  let accidentCheckForm = {
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
        CheckAccidentComponent 
      ],
      providers: [
        AccidentService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(CheckAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Get accident by vehicle's registration number", () => {
    component.checkForm.patchValue({'vehicleRegistrationNumber': accidentCheckForm.vehicleRegistrationNumber});
    const service = new AccidentService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of(accident));
    service.findAccident(component.checkForm.value).subscribe({
      next: (res) => {
        
        expect(res).toEqual(accident);
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});
