import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextKinComponent } from './next-kin.component';

describe('NextKinComponent', () => {
  let component: NextKinComponent;
  let fixture: ComponentFixture<NextKinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextKinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
