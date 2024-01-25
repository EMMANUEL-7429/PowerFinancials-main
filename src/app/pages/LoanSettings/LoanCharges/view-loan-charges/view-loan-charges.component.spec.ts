import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanChargesComponent } from './view-loan-charges.component';

describe('ViewLoanChargesComponent', () => {
  let component: ViewLoanChargesComponent;
  let fixture: ComponentFixture<ViewLoanChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
