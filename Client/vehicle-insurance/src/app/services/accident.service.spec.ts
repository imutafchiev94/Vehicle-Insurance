import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccidentService } from './accident.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { AllAccidentsComponent } from '../accidents/all-accidents/all-accidents.component';

import { RouterTestingModule } from '@angular/router/testing';


xdescribe('AccidentService', () => {
  let service: AccidentService;
  let component: AllAccidentsComponent;
  let fixture: ComponentFixture<AllAccidentsComponent>;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAccidentsComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],providers: [AccidentService]
    }).compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAccidentsComponent);
    service = TestBed.inject(AccidentService);
    component = fixture.componentInstance;
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

