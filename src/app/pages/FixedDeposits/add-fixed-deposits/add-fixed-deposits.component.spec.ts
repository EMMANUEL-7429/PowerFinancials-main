import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixedDepositsComponent } from './add-fixed-deposits.component';

describe('AddFixedDepositsComponent', () => {
  let component: AddFixedDepositsComponent;
  let fixture: ComponentFixture<AddFixedDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFixedDepositsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFixedDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
