import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymodeComponent } from './add-paymode.component';

describe('AddPaymodeComponent', () => {
  let component: AddPaymodeComponent;
  let fixture: ComponentFixture<AddPaymodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
