import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialExampleModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddVehicleComponent } from './add-vehicle.component';
import { VehicleService } from '../../services/vehicle.service';
import { of } from 'rxjs';

describe('AddVehicleComponent', () => {
  let component: AddVehicleComponent;
  let fixture: ComponentFixture<AddVehicleComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  
  let vehicleForm = {
    brand: 'Citroen',
    model: 'C4',
    yearOfManufacture: 2015,
    registrationNumber: 'CT8619K',
    ownerEGN: '0045155956',
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
        AddVehicleComponent 
      ],
      providers: [
        VehicleService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(AddVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add owner and get message', () => {
    component.vehicleForm.patchValue({'brand': vehicleForm.brand})
    component.vehicleForm.patchValue({'model': vehicleForm.model})
    component.vehicleForm.patchValue({'yearOfManufactor': vehicleForm.yearOfManufacture})
    component.vehicleForm.patchValue({'registrationNumber': vehicleForm.registrationNumber})
    component.vehicleForm.patchValue({'ownerEGN': vehicleForm.ownerEGN})
    const service = new VehicleService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of('Vehicle was added successfully!'));
    service.addVehicle(component.vehicleForm.value).subscribe({
      next: (res) => {
        
        expect(res).toContain('Vehicle was added successfully!');
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  }) 
});
