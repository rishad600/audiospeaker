/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AudioDataService } from './audio-data.service';

describe('Service: AudioData', () => {
  beforeEach(() => {
    addProviders([AudioDataService]);
  });

  it('should ...',
    inject([AudioDataService],
      (service: AudioDataService) => {
        expect(service).toBeTruthy();
      }));
});
