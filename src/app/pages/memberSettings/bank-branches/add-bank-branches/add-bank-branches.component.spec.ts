import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankBranchesComponent } from './add-bank-branches.component';

describe('AddBankBranchesComponent', () => {
  let component: AddBankBranchesComponent;
  let fixture: ComponentFixture<AddBankBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBankBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBankBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
