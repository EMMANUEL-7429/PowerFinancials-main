import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertNextofKinComponent } from './insert-nextof-kin.component';

describe('InsertNextofKinComponent', () => {
  let component: InsertNextofKinComponent;
  let fixture: ComponentFixture<InsertNextofKinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertNextofKinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertNextofKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
