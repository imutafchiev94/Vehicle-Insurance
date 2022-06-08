import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUnpaidPaymentsComponent } from './all-unpaid-payments.component';

describe('AllUnpaidPaymentsComponent', () => {
  let component: AllUnpaidPaymentsComponent;
  let fixture: ComponentFixture<AllUnpaidPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUnpaidPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUnpaidPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
