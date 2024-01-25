import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanRepaymentsComponent } from './add-loan-repayments.component';

describe('AddLoanRepaymentsComponent', () => {
  let component: AddLoanRepaymentsComponent;
  let fixture: ComponentFixture<AddLoanRepaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanRepaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanRepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
