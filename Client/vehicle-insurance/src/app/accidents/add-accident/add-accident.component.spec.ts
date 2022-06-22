import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AccidentService } from '../../services/accident.service';
import { MaterialExampleModule } from '../../../material.module';
import { of } from 'rxjs';

import { AddAccidentComponent } from './add-accident.component';

describe('AddAccidentComponent', () => {
  let component: AddAccidentComponent;
  let fixture: ComponentFixture<AddAccidentComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let accidentForm = {
    vehicleRegistrationNumber: 'PB4054CA',
      accidentDate: new Date('2022-06-16T21:00:00.000+00:00'),
      driverFirstName: 'John',
      driverMiddleName: '',
      driverSurname: 'Doe',
      driverGender: 'Male',
      imageSource: 'https://previews.123rf.com/images/robodread/robodread1204/robodread120400003/13097559-car-accident.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ultrices mauris, vestibulum venenatis massa. Suspendisse metus turpis, mattis eget augue a, dapibus feugiat leo. Integer bibendum imperdiet lorem. Maecenas maximus, mauris nec cursus scelerisque, nibh mauris tempus felis, a laoreet nulla urna dictum ante. Nulla ut sodales quam, eu tempus nisl. Mauris lobortis leo ornare risus dignissim, non dictum est ultrices. Praesent hendrerit massa quis tortor pretium efficitur. Fusce blandit libero est, a congue ante tempor ut. Proin semper sit amet dolor non ullamcorper. Sed condimentum ipsum non mi pulvinar scelerisque. Cras fringilla nunc et justo blandit ullamcorper. Integer at eros quis elit porttitor dictum.',
      driverEGN:'0145076486 ',
      driverDateOfBirth: new Date('2001-05-07T21:00:00.000+00:00'),
  }

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
        AddAccidentComponent 
      ],
      providers: [
        AccidentService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(AddAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add accident and get message', () => {
    component.accidentForm.patchValue({'accidentDate': accidentForm.accidentDate})
    component.accidentForm.patchValue({'description': accidentForm.description})
    component.accidentForm.patchValue({'driverDateOfBirth': accidentForm.driverDateOfBirth})
    component.accidentForm.patchValue({'driverEGN': accidentForm.driverEGN})
    component.accidentForm.patchValue({'driverFirstName': accidentForm.driverFirstName})
    component.accidentForm.patchValue({'driverMiddleName': accidentForm.driverMiddleName})
    component.accidentForm.patchValue({'driverSurname': accidentForm.driverSurname})
    component.accidentForm.patchValue({'driverGender': accidentForm.driverGender})
    component.accidentForm.patchValue({'imageSource': accidentForm.imageSource})
    component.accidentForm.patchValue({'vehicleRegistrationNumber': accidentForm.vehicleRegistrationNumber})
    const service = new AccidentService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of('Accident was added successfully!'));
    service.addAccident(component.accidentForm.value).subscribe({
      next: (res) => {
       
        expect(res).toContain('Accident was added successfully!');
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  }) 
});
