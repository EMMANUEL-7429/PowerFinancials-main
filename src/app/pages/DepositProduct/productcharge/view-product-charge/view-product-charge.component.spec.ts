import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductChargeComponent } from './view-product-charge.component';

describe('ViewProductChargeComponent', () => {
  let component: ViewProductChargeComponent;
  let fixture: ComponentFixture<ViewProductChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
