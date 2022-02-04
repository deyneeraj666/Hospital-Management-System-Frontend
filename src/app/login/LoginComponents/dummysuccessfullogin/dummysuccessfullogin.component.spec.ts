import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummysuccessfulloginComponent } from './dummysuccessfullogin.component';

describe('DummysuccessfulloginComponent', () => {
  let component: DummysuccessfulloginComponent;
  let fixture: ComponentFixture<DummysuccessfulloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummysuccessfulloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummysuccessfulloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
