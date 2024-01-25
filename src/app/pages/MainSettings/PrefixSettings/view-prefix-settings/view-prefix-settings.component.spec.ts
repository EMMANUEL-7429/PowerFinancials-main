import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrefixSettingsComponent } from './view-prefix-settings.component';

describe('ViewPrefixSettingsComponent', () => {
  let component: ViewPrefixSettingsComponent;
  let fixture: ComponentFixture<ViewPrefixSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPrefixSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPrefixSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
