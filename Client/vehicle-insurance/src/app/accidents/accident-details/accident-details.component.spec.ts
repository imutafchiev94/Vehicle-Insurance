import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Accident } from 'src/app/models/Accident';
import { Insurance } from 'src/app/models/Insurance';
import { Owner } from 'src/app/models/Owner';
import { Vehicle } from 'src/app/models/Vehicle';
import { AccidentService } from 'src/app/services/accident.service';
import { of } from 'rxjs';
import { AccidentDetailsComponent } from './accident-details.component';

fdescribe('AccidentDetailsComponent', () => {
  let component: AccidentDetailsComponent;
  let fixture: ComponentFixture<AccidentDetailsComponent>;
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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        AccidentDetailsComponent 
      ],
      providers:[
        AccidentService
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get accident details', () => {
    const service = fixture.debugElement.injector.get(AccidentService);
    spyOn(service, "getAccident").and.returnValue(of(accident))
    component.fetchData();
    console.log(component);
    expect(component.accident).toEqual(accident);
  });
});
