import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoantypeChargesComponent } from './view-loantype-charges.component';

describe('ViewLoantypeChargesComponent', () => {
  let component: ViewLoantypeChargesComponent;
  let fixture: ComponentFixture<ViewLoantypeChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoantypeChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoantypeChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
