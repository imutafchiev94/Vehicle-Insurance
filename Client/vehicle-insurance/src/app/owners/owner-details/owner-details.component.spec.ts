import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Owner } from 'src/app/models/Owner';
import { Vehicle } from 'src/app/models/Vehicle';
import { OwnerService } from 'src/app/services/owner.service';
import { of } from 'rxjs';
import { OwnerDetailsComponent } from './owner-details.component';

fdescribe('OwnerDetailsComponent', () => {
  let component: OwnerDetailsComponent;
  let fixture: ComponentFixture<OwnerDetailsComponent>;

  let vehicle = {
    "brand": 'Citroen',
    "model": 'C4',
    "yearOfManufacture": 2015,
    "registrationNumber": 'CT8619K'
  } as Vehicle
  
  let owner = {
    firstName: 'Gosho',
    middleName: '',
    surname: 'Kueilio',
    age: 25,
    dateOfBirth:  new Date('2000-05-14T21:00:00.000+00:00'),
    gender: 'Female',
    EGN: '0045155956',
    vehicles: [
      vehicle,
    ]
} as Owner

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        OwnerDetailsComponent 
      ],
      providers: [
        OwnerService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get insurance details', () => {
    const service = fixture.debugElement.injector.get(OwnerService);
    spyOn(service, "getOwner").and.returnValue(of(owner))
    component.fetchData();
    
    expect(component.owner).toEqual(owner);
    expect(component.owner._id).toEqual(owner._id);
    expect(component.owner.EGN).toEqual(owner.EGN);
  });
});
