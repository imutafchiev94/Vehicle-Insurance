import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialExampleModule } from '../../../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AddOwnerComponent } from './add-owner.component';
import { OwnerService } from '../../services/owner.service';

describe('AddOwnerComponent', () => {
  let component: AddOwnerComponent;
  let fixture: ComponentFixture<AddOwnerComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  
  let ownerForm = {
    firstName: 'John',
    surname: 'Doe',
    age: 26,
    dateOfBirth: new Date('1995-07-15T07:49:08.990+00:00'),
    gender: 'Male',
    EGN:'9507150033'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialExampleModule,
        BrowserAnimationsModule
      ],
      declarations: [ 
        AddOwnerComponent 
      ],
      providers: [
        OwnerService
      ]
    })
    .compileComponents();

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    fixture = TestBed.createComponent(AddOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Add owner and get message', () => {
    component.ownerForm.patchValue({'firstName': ownerForm.firstName})
    component.ownerForm.patchValue({'surname': ownerForm.surname})
    component.ownerForm.patchValue({'age': ownerForm.age})
    component.ownerForm.patchValue({'dateOfBirth': ownerForm.dateOfBirth})
    component.ownerForm.patchValue({'gender': ownerForm.gender})
    component.ownerForm.patchValue({'EGN': ownerForm.EGN})
    const service = new OwnerService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of('Owner was added successfully!'));
    service.addOwner(component.ownerForm.value).subscribe({
      next: (res) => {
        
        expect(res).toContain('Owner was added successfully!');
      },
      error: () => {}
    });
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  }) 
});
