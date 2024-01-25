import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanApplicationComponent } from './add-loan-application.component';

describe('AddLoanApplicationComponent', () => {
  let component: AddLoanApplicationComponent;
  let fixture: ComponentFixture<AddLoanApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoanApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoanApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
