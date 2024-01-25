import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateproductchargeComponent } from './updateproductcharge.component';

describe('UpdateproductchargeComponent', () => {
  let component: UpdateproductchargeComponent;
  let fixture: ComponentFixture<UpdateproductchargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateproductchargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateproductchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
