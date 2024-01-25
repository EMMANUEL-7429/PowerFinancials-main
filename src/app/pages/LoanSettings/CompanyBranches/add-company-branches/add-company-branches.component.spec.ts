import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyBranchesComponent } from './add-company-branches.component';

describe('AddCompanyBranchesComponent', () => {
  let component: AddCompanyBranchesComponent;
  let fixture: ComponentFixture<AddCompanyBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
