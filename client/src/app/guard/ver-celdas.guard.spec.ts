import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verCeldasGuard } from './ver-celdas.guard';

describe('verCeldasGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verCeldasGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
