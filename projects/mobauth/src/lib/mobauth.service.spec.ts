import { TestBed } from '@angular/core/testing';

import { MobauthService } from './mobauth.service';

describe('MobauthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobauthService = TestBed.get(MobauthService);
    expect(service).toBeTruthy();
  });
});
