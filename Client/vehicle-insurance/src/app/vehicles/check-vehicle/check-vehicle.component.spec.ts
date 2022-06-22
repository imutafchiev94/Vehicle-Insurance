import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Vehicle } from '../../models/Vehicle';
import { MaterialExampleModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckVehicleComponent } from './check-vehicle.component';
import { VehicleService } from '../../services/vehicle.service';
import { of } from 'rxjs';

describe('CheckVehicleComponent', () => {
  let component: CheckVehicleComponent;
  let fixture: ComponentFixture<CheckVehicleComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let vehicle = {
    "brand": 'Citroen',
    "model": 'C4',
    "yearOfManufacture": 2015,
    "registrationNumber": 'CT8619K'
  } as Vehicle

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
        CheckVehicleComponent 
      ],
      providers: [
        VehicleService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(CheckVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Get Vehicle by registration number", () => {
    component.checkForm.patchValue({'registrationNumber': vehicle.registrationNumber});
    const service = new VehicleService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of(vehicle));
    service.findVehicle(component.checkForm.value).subscribe({
      next: (res) => {
        
        expect(res).toEqual(vehicle);
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });
});
