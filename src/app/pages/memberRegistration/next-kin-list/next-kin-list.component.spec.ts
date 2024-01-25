import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextKinListComponent } from './next-kin-list.component';

describe('NextKinListComponent', () => {
  let component: NextKinListComponent;
  let fixture: ComponentFixture<NextKinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextKinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextKinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
