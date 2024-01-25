import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoanPurposeComponent } from './view-loan-purpose.component';

describe('ViewLoanPurposeComponent', () => {
  let component: ViewLoanPurposeComponent;
  let fixture: ComponentFixture<ViewLoanPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoanPurposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoanPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
