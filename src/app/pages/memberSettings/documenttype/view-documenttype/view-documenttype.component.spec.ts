import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumenttypeComponent } from './view-documenttype.component';

describe('ViewDocumenttypeComponent', () => {
  let component: ViewDocumenttypeComponent;
  let fixture: ComponentFixture<ViewDocumenttypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDocumenttypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumenttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
