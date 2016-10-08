/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { WordComponent } from './word.component';

describe('Component: Word', () => {
  it('should create an instance', () => {
    let component = new WordComponent();
    expect(component).toBeTruthy();
  });
});
