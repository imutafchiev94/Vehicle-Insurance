import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInsurancesComponent } from './all-insurances.component';

describe('AllInsurancesComponent', () => {
  let component: AllInsurancesComponent;
  let fixture: ComponentFixture<AllInsurancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInsurancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
