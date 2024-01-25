import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKinRelationComponent } from './add-kin-relation.component';

describe('AddKinRelationComponent', () => {
  let component: AddKinRelationComponent;
  let fixture: ComponentFixture<AddKinRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKinRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKinRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
