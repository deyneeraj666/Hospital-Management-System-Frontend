import { TestBed } from '@angular/core/testing';
import { Procedure_Service } from './procedure.service';




describe('Procedure_Service', () => {
  let service: Procedure_Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Procedure_Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


