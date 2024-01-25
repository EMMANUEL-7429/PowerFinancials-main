import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditOfficerComponent } from './add-credit-officer.component';

describe('AddCreditOfficerComponent', () => {
  let component: AddCreditOfficerComponent;
  let fixture: ComponentFixture<AddCreditOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCreditOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreditOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
