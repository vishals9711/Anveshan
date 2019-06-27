import { TestBed, inject } from '@angular/core/testing';

import { Data2ServerService } from './data2-server.service';

describe('Data2ServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Data2ServerService]
    });
  });

  it('should ...', inject([Data2ServerService], (service: Data2ServerService) => {
    expect(service).toBeTruthy();
  }));
});
