import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyBranchComponent } from './view-company-branch.component';

describe('ViewCompanyBranchComponent', () => {
  let component: ViewCompanyBranchComponent;
  let fixture: ComponentFixture<ViewCompanyBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompanyBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompanyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
