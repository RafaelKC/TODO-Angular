import { TestBed } from '@angular/core/testing';

import { ToDo2Service } from './to-do2.service';

describe('ToDo2Service', () => {
  let service: ToDo2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDo2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
