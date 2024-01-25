import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLoantypeComponent } from './view-loantype.component';

describe('ViewLoantypeComponent', () => {
  let component: ViewLoantypeComponent;
  let fixture: ComponentFixture<ViewLoantypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLoantypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLoantypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
