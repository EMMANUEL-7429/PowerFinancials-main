import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductChargeComponent } from './add-product-charge.component';

describe('AddProductChargeComponent', () => {
  let component: AddProductChargeComponent;
  let fixture: ComponentFixture<AddProductChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
