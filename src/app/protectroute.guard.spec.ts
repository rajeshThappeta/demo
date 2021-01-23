import { TestBed } from '@angular/core/testing';

import { ProtectrouteGuard } from './protectroute.guard';

describe('ProtectrouteGuard', () => {
  let guard: ProtectrouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectrouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
