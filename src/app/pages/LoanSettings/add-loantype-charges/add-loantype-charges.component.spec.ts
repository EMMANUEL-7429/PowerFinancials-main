import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoantypeChargesComponent } from './add-loantype-charges.component';

describe('AddLoantypeChargesComponent', () => {
  let component: AddLoantypeChargesComponent;
  let fixture: ComponentFixture<AddLoantypeChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoantypeChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoantypeChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
