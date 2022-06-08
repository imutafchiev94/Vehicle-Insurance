import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentToPayComponent } from './payment-to-pay.component';

describe('PaymentToPayComponent', () => {
  let component: PaymentToPayComponent;
  let fixture: ComponentFixture<PaymentToPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentToPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
