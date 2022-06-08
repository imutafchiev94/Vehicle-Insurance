import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaidPaymentsComponent } from './all-paid-payments.component';

describe('AllPaidPaymentsComponent', () => {
  let component: AllPaidPaymentsComponent;
  let fixture: ComponentFixture<AllPaidPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaidPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPaidPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
