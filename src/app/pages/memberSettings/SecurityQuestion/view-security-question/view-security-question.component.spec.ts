import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSecurityQuestionComponent } from './view-security-question.component';

describe('ViewSecurityQuestionComponent', () => {
  let component: ViewSecurityQuestionComponent;
  let fixture: ComponentFixture<ViewSecurityQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSecurityQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
