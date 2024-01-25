import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSetupSettingsComponent } from './view-setup-settings.component';

describe('ViewSetupSettingsComponent', () => {
  let component: ViewSetupSettingsComponent;
  let fixture: ComponentFixture<ViewSetupSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSetupSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSetupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
