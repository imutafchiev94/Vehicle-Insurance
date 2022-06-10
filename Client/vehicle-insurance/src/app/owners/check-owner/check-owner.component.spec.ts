import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOwnerComponent } from './check-owner.component';

describe('CheckOwnerComponent', () => {
  let component: CheckOwnerComponent;
  let fixture: ComponentFixture<CheckOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
