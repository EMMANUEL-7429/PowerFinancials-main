import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberStatusComponent } from './add-member-status.component';

describe('AddMemberStatusComponent', () => {
  let component: AddMemberStatusComponent;
  let fixture: ComponentFixture<AddMemberStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
