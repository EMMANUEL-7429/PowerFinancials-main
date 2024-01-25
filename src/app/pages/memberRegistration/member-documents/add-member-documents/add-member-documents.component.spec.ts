import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberDocumentsComponent } from './add-member-documents.component';

describe('AddMemberDocumentsComponent', () => {
  let component: AddMemberDocumentsComponent;
  let fixture: ComponentFixture<AddMemberDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
