import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { terminosGuard } from './terminos.guard';

describe('terminosGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => terminosGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
