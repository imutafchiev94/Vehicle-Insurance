import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInsurancesComponent } from './check-insurances.component';

describe('CheckInsurancesComponent', () => {
  let component: CheckInsurancesComponent;
  let fixture: ComponentFixture<CheckInsurancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckInsurancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
