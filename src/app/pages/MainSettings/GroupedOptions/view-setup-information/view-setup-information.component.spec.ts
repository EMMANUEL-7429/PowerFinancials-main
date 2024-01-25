import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSetupInformationComponent } from './view-setup-information.component';

describe('ViewSetupInformationComponent', () => {
  let component: ViewSetupInformationComponent;
  let fixture: ComponentFixture<ViewSetupInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSetupInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSetupInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
