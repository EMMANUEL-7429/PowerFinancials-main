import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanChargesListTariffComponent } from './add-loan-charges-list-tariff.component';

describe('AddLoanChargesListTariffComponent', () => {
  let component: AddLoanChargesListTariffComponent;
  let fixture: ComponentFixture<AddLoanChargesListTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLoanChargesListTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanChargesListTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
