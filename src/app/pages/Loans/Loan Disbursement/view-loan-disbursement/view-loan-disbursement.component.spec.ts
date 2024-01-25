import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanDisbursementComponent } from './view-loan-disbursement.component';

describe('ViewLoanDisbursementComponent', () => {
  let component: ViewLoanDisbursementComponent;
  let fixture: ComponentFixture<ViewLoanDisbursementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanDisbursementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
