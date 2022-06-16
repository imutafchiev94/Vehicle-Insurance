import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAccidentsComponent } from './all-accidents.component';

describe('AllAccidentsComponent', () => {
  let component: AllAccidentsComponent;
  let fixture: ComponentFixture<AllAccidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAccidentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAccidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
