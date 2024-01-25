import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymodesComponent } from './view-paymodes.component';

describe('ViewPaymodesComponent', () => {
  let component: ViewPaymodesComponent;
  let fixture: ComponentFixture<ViewPaymodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPaymodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaymodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
