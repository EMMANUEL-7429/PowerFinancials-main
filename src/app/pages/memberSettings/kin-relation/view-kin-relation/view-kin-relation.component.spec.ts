import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKinRelationComponent } from './view-kin-relation.component';

describe('ViewKinRelationComponent', () => {
  let component: ViewKinRelationComponent;
  let fixture: ComponentFixture<ViewKinRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewKinRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewKinRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
