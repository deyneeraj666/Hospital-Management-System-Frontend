import { TestBed } from '@angular/core/testing';
import { Diag_Service } from './diagnosis.service';



describe('Diag_Service', () => {
  let service: Diag_Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Diag_Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


