import { TestBed } from '@angular/core/testing';
import { Medication_Service } from './medications.service';



describe('Medication_Service', () => {
  let service: Medication_Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Medication_Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


