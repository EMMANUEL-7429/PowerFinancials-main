import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanDisbursementComponent } from './add-loan-disbursement.component';

describe('AddLoanDisbursementComponent', () => {
  let component: AddLoanDisbursementComponent;
  let fixture: ComponentFixture<AddLoanDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanDisbursementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
