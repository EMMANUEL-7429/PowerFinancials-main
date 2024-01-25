import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStructureValueComponent } from './view-structure-value.component';

describe('ViewStructureValueComponent', () => {
  let component: ViewStructureValueComponent;
  let fixture: ComponentFixture<ViewStructureValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStructureValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStructureValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
