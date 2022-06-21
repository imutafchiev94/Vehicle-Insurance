import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Accident } from '../models/Accident';
import {Vehicle} from '../models/Vehicle';
import {Owner} from '../models/Owner';
import { AccidentService } from './accident.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { AllAccidentsComponent } from '../accidents/all-accidents/all-accidents.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpResponse } from '@angular/common/http';

describe('AccidentService', () => {
  let service: AccidentService;
  let component: AllAccidentsComponent;
  let fixture: ComponentFixture<AllAccidentsComponent>;
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
  }
  let accidents = [{
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
  
  }] as undefined as Array<Accident>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAccidentsComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],providers: [AccidentService]
    }).compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAccidentsComponent);
    service = TestBed.inject(AccidentService);
    component = fixture.componentInstance;
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing subscribe method getting called', fakeAsync(() => {
    let accidentSpy = spyOn(service, 'getAllAccidents').and.returnValue(of (accidents));
    let subSpy = spyOn(service.getAllAccidents(), 'subscribe');
    console.log(accidents)
    component.ngOnInit();
    tick();
    expect(accidentSpy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }))

  it('testing execution within subscribe method', fakeAsync(() => {
    let accidentSpy = spyOn(service, 'getAllAccidents').and.returnValue(of (accidents));
    let subSpy = spyOn(service.getAllAccidents(), 'subscribe');
    component.fetchDataAccidents();
    tick();
    expect(component.accidents).toBeDefined();
    expect(component.accidents.length).toEqual(accidents.length);
  }))
});

