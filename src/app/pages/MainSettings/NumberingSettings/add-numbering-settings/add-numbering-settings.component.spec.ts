import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNumberingSettingsComponent } from './add-numbering-settings.component';

describe('AddNumberingSettingsComponent', () => {
  let component: AddNumberingSettingsComponent;
  let fixture: ComponentFixture<AddNumberingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNumberingSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNumberingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
