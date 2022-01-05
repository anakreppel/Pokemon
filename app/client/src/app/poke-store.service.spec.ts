import { TestBed } from '@angular/core/testing';

import { PokeStoreService } from './poke-store.service';

describe('PokeStoreService', () => {
  let service: PokeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
