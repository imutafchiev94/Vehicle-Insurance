import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Owner } from 'src/app/models/Owner';
import { Vehicle } from 'src/app/models/Vehicle';
import { MaterialExampleModule } from 'src/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CheckOwnerComponent } from './check-owner.component';
import { OwnerService } from 'src/app/services/owner.service';
import { HttpClient } from '@angular/common/http';

fdescribe('CheckOwnerComponent', () => {
  let component: CheckOwnerComponent;
  let fixture: ComponentFixture<CheckOwnerComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
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
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialExampleModule,
        BrowserAnimationsModule
      ],
      declarations: [ 
        CheckOwnerComponent 
      ],
      providers: [
        OwnerService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(CheckOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Get Owner by EGN", () => {
    component.checkForm.patchValue({'EGN': owner.EGN});
    const service = new OwnerService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of(owner));
    service.findOwner(component.checkForm.value).subscribe({
      next: (res) => {
        
        expect(res).toEqual(owner);
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});
