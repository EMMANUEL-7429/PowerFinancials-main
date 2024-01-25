import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTransactionChargesComponent } from './view-transaction-charges.component';

describe('ViewTransactionChargesComponent', () => {
  let component: ViewTransactionChargesComponent;
  let fixture: ComponentFixture<ViewTransactionChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTransactionChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTransactionChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
