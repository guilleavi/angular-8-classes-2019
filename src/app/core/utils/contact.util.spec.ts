import { TestBed } from '@angular/core/testing';

import { ContactUtil } from './contact.util';

describe('ContactUtil', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const util: ContactUtil = TestBed.get(ContactUtil);
    expect(util).toBeTruthy();
  });
});
