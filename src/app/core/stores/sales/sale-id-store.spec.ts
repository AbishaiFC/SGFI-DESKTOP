import { TestBed } from '@angular/core/testing';

import { SaleIdStore } from './sale-id-store';

describe('SaleIdStore', () => {
  let service: SaleIdStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleIdStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
