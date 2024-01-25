import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSetupInformationComponent } from './edit-setup-information.component';

describe('EditSetupInformationComponent', () => {
  let component: EditSetupInformationComponent;
  let fixture: ComponentFixture<EditSetupInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSetupInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSetupInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
