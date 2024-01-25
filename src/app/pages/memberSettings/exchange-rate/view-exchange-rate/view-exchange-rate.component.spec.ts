import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExchangeRateComponent } from './view-exchange-rate.component';

describe('ViewExchangeRateComponent', () => {
  let component: ViewExchangeRateComponent;
  let fixture: ComponentFixture<ViewExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExchangeRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
