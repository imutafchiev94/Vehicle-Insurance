import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckVehicleComponent } from './check-vehicle.component';

describe('CheckVehicleComponent', () => {
  let component: CheckVehicleComponent;
  let fixture: ComponentFixture<CheckVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
