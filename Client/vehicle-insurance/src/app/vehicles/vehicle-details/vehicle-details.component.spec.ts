import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Vehicle } from '../../models/Vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { of } from 'rxjs';
import { VehicleDetailsComponent } from './vehicle-details.component';

describe('VehicleDetailsComponent', () => {
  let component: VehicleDetailsComponent;
  let fixture: ComponentFixture<VehicleDetailsComponent>;

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
        HttpClientTestingModule
      ],
      declarations: [ 
        VehicleDetailsComponent 
      ],
      providers: [
        VehicleService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get vehicle details', () => {
    const service = fixture.debugElement.injector.get(VehicleService);
    spyOn(service, "getVehicleDetails").and.returnValue(of(vehicle))
    component.fetchData();
    
    expect(component.vehicle).toEqual(vehicle);
    expect(component.vehicle._id).toEqual(vehicle._id);
    expect(component.vehicle.registrationNumber).toEqual(vehicle.registrationNumber);
  });
});
