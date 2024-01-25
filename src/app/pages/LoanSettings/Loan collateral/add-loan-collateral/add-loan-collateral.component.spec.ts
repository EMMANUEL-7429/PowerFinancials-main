import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanCollateralComponent } from './add-loan-collateral.component';

describe('AddLoanCollateralComponent', () => {
  let component: AddLoanCollateralComponent;
  let fixture: ComponentFixture<AddLoanCollateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanCollateralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanCollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
