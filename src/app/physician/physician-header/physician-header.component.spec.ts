import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianHeaderComponent } from './physician-header.component';

describe('PhysicianHeaderComponent', () => {
  let component: PhysicianHeaderComponent;
  let fixture: ComponentFixture<PhysicianHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
