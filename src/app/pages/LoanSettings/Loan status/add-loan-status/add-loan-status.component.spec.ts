import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanStatusComponent } from './add-loan-status.component';

describe('AddLoanStatusComponent', () => {
  let component: AddLoanStatusComponent;
  let fixture: ComponentFixture<AddLoanStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
