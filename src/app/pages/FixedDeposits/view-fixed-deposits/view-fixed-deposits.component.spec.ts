import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFixedDepositsComponent } from './view-fixed-deposits.component';

describe('ViewFixedDepositsComponent', () => {
  let component: ViewFixedDepositsComponent;
  let fixture: ComponentFixture<ViewFixedDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFixedDepositsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFixedDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
