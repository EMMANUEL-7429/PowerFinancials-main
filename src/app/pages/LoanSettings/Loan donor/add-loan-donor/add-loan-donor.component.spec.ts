import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanDonorComponent } from './add-loan-donor.component';

describe('AddLoanDonorComponent', () => {
  let component: AddLoanDonorComponent;
  let fixture: ComponentFixture<AddLoanDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanDonorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
