import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanGuarantorComponent } from './view-loan-guarantor.component';

describe('ViewLoanGuarantorComponent', () => {
  let component: ViewLoanGuarantorComponent;
  let fixture: ComponentFixture<ViewLoanGuarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanGuarantorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
