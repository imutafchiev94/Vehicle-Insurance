import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { InsuranceService } from 'src/app/services/insurance.service';
import { MaterialExampleModule } from 'src/material.module';
import { of } from 'rxjs';

import { AddInsuranceComponent } from './add-insurance.component';

fdescribe('AddInsuranceComponent', () => {
  let component: AddInsuranceComponent;
  let fixture: ComponentFixture<AddInsuranceComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  let insuranceForm = {
    vehicleRegistrationNumber: 'CA5639PC',
      countOfPayments: 12,
      imageSource: 'https://previews.123rf.com/images/robodread/robodread1204/robodread120400003/13097559-car-accident.jpg',
      ownerEGN:'0045155956 ',
      totalAmount: 220,

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
        AddInsuranceComponent 
      ],
      providers: [
        InsuranceService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(AddInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Add accident and get message', () => {
    component.insuranceForm.patchValue({'ownerEGN': insuranceForm.ownerEGN})
    component.insuranceForm.patchValue({'imageSource': insuranceForm.imageSource})
    component.insuranceForm.patchValue({'countOfPayments': insuranceForm.countOfPayments})
    component.insuranceForm.patchValue({'totalAmount': insuranceForm.totalAmount})
    component.insuranceForm.patchValue({'vehicleRegistrationNumber': insuranceForm.vehicleRegistrationNumber})
    const service = new InsuranceService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of('Insurance was added successfully!'));
    service.addInsurance(component.insuranceForm.value).subscribe({
      next: (res) => {
        console.log(res);
        expect(res).toContain('Insurance was added successfully!');
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  }) 
});
