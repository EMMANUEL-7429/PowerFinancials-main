import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDisbursedLoanComponent } from './view-disbursed-loan.component';

describe('ViewDisbursedLoanComponent', () => {
  let component: ViewDisbursedLoanComponent;
  let fixture: ComponentFixture<ViewDisbursedLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDisbursedLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDisbursedLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
