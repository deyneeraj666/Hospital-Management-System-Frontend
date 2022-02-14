import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyGridComponent } from './allergy-grid.component';

describe('AllergyGridComponent', () => {
  let component: AllergyGridComponent;
  let fixture: ComponentFixture<AllergyGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
