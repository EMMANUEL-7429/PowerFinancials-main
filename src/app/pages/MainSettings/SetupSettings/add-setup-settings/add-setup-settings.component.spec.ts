import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupSettingsComponent } from './add-setup-settings.component';

describe('AddSetupSettingsComponent', () => {
  let component: AddSetupSettingsComponent;
  let fixture: ComponentFixture<AddSetupSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSetupSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
