import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisburseChargesComponent } from './disburse-charges.component';

describe('DisburseChargesComponent', () => {
  let component: DisburseChargesComponent;
  let fixture: ComponentFixture<DisburseChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisburseChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisburseChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
