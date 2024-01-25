import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionChargesComponent } from './add-transaction-charges.component';

describe('AddTransactionChargesComponent', () => {
  let component: AddTransactionChargesComponent;
  let fixture: ComponentFixture<AddTransactionChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransactionChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
