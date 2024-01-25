import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanGuarantorComponent } from './add-loan-guarantor.component';

describe('AddLoanGuarantorComponent', () => {
  let component: AddLoanGuarantorComponent;
  let fixture: ComponentFixture<AddLoanGuarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanGuarantorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
