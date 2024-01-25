import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountListComponent } from './create-account-list.component';

describe('CreateAccountListComponent', () => {
  let component: CreateAccountListComponent;
  let fixture: ComponentFixture<CreateAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
