import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructureValueComponent } from './add-structure-value.component';

describe('AddStructureValueComponent', () => {
  let component: AddStructureValueComponent;
  let fixture: ComponentFixture<AddStructureValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStructureValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructureValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
