import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanAppraisalComponent } from './view-loan-appraisal.component';

describe('ViewLoanAppraisalComponent', () => {
  let component: ViewLoanAppraisalComponent;
  let fixture: ComponentFixture<ViewLoanAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanAppraisalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
