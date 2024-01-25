import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanChargesListTariffComponent } from './view-loan-charges-list-tariff.component';

describe('ViewLoanChargesListTariffComponent', () => {
  let component: ViewLoanChargesListTariffComponent;
  let fixture: ComponentFixture<ViewLoanChargesListTariffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewLoanChargesListTariffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanChargesListTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
