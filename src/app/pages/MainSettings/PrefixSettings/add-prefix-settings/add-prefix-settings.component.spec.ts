import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrefixSettingsComponent } from './add-prefix-settings.component';

describe('AddPrefixSettingsComponent', () => {
  let component: AddPrefixSettingsComponent;
  let fixture: ComponentFixture<AddPrefixSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrefixSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrefixSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
