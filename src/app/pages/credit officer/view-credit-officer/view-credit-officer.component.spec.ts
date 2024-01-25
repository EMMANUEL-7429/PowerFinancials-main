import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreditOfficerComponent } from './view-credit-officer.component';

describe('ViewCreditOfficerComponent', () => {
  let component: ViewCreditOfficerComponent;
  let fixture: ComponentFixture<ViewCreditOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCreditOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreditOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
