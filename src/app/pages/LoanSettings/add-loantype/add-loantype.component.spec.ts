import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoantypeComponent } from './add-loantype.component';

describe('AddLoantypeComponent', () => {
  let component: AddLoantypeComponent;
  let fixture: ComponentFixture<AddLoantypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLoantypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoantypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
