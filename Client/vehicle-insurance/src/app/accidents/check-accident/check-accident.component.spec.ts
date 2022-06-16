import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAccidentComponent } from './check-accident.component';

describe('CheckAccidentComponent', () => {
  let component: CheckAccidentComponent;
  let fixture: ComponentFixture<CheckAccidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAccidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
