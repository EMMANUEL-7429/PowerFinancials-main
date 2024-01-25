import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanDonorComponent } from './view-loan-donor.component';

describe('ViewLoanDonorComponent', () => {
  let component: ViewLoanDonorComponent;
  let fixture: ComponentFixture<ViewLoanDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanDonorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
