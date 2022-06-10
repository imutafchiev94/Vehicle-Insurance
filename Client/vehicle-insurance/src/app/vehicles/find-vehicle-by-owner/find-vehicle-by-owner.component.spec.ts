import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindVehicleByOwnerComponent } from './find-vehicle-by-owner.component';

describe('FindVehicleByOwnerComponent', () => {
  let component: FindVehicleByOwnerComponent;
  let fixture: ComponentFixture<FindVehicleByOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindVehicleByOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindVehicleByOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
