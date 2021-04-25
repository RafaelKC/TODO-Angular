import { TestBed } from '@angular/core/testing';

import { ToDoResolver } from './to-do.resolver';

describe('ToDoResolver', () => {
  let resolver: ToDoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ToDoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
