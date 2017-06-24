/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlanetResources from 'gameEngine/components/PopulationComponent';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('init new component', () => {
    let comp = new PlanetResources(5);
    expect(comp.value).toBe(5);
    expect(comp.value).toBe(5);
  });
});