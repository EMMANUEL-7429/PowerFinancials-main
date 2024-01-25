import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanAppraisalComponent } from './add-loan-appraisal.component';

describe('AddLoanAppraisalComponent', () => {
  let component: AddLoanAppraisalComponent;
  let fixture: ComponentFixture<AddLoanAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
