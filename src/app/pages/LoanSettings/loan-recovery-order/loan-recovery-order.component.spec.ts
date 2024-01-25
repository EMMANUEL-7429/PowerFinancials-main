import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRecoveryOrderComponent } from './loan-recovery-order.component';

describe('LoanRecoveryOrderComponent', () => {
  let component: LoanRecoveryOrderComponent;
  let fixture: ComponentFixture<LoanRecoveryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRecoveryOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRecoveryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
