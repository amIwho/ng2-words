import { TestBed, inject } from '@angular/core/testing';

import { WordsHttpService } from './words-http.service';

describe('WordsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordsHttpService]
    });
  });

  it('should be created', inject([WordsHttpService], (service: WordsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
