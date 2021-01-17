import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionFieldComponent } from './division-field.component';

describe('DivisionFieldComponent', () => {
  let component: DivisionFieldComponent;
  let fixture: ComponentFixture<DivisionFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivisionFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
