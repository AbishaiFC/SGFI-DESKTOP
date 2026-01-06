import { TestBed } from '@angular/core/testing';

import { WebsocketStore } from './websocket-store';

describe('WebsocketStore', () => {
  let service: WebsocketStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
