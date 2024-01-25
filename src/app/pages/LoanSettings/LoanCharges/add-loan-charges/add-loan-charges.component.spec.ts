import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanChargesComponent } from './add-loan-charges.component';

describe('AddLoanChargesComponent', () => {
  let component: AddLoanChargesComponent;
  let fixture: ComponentFixture<AddLoanChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
