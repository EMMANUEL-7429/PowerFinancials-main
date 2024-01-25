import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanCollateralComponent } from './view-loan-collateral.component';

describe('ViewLoanCollateralComponent', () => {
  let component: ViewLoanCollateralComponent;
  let fixture: ComponentFixture<ViewLoanCollateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanCollateralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanCollateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
