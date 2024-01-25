import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentStructureValueComponent } from './parent-structure-value.component';

describe('ParentStructureValueComponent', () => {
  let component: ParentStructureValueComponent;
  let fixture: ComponentFixture<ParentStructureValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentStructureValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStructureValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
