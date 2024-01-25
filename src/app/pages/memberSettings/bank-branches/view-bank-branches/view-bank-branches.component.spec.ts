import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankBranchesComponent } from './view-bank-branches.component';

describe('ViewBankBranchesComponent', () => {
  let component: ViewBankBranchesComponent;
  let fixture: ComponentFixture<ViewBankBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBankBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
