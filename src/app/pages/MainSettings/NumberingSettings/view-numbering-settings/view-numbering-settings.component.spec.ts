import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNumberingSettingsComponent } from './view-numbering-settings.component';

describe('ViewNumberingSettingsComponent', () => {
  let component: ViewNumberingSettingsComponent;
  let fixture: ComponentFixture<ViewNumberingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNumberingSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNumberingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
