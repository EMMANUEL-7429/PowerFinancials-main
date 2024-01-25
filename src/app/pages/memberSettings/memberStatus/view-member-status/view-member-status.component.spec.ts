import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMemberStatusComponent } from './view-member-status.component';

describe('ViewMemberStatusComponent', () => {
  let component: ViewMemberStatusComponent;
  let fixture: ComponentFixture<ViewMemberStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMemberStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMemberStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
