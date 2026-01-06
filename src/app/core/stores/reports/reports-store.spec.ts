import { TestBed } from '@angular/core/testing';

import { ReportsStore } from './reports-store';

describe('ReportsStore', () => {
  let service: ReportsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
