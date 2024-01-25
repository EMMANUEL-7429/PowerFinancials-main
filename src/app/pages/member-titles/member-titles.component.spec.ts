import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTitlesComponent } from './member-titles.component';

describe('MemberTitlesComponent', () => {
  let component: MemberTitlesComponent;
  let fixture: ComponentFixture<MemberTitlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTitlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
