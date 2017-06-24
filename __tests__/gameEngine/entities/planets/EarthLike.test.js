/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {POPULATION_COMP} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
        // setup the test
  });

  it('init earth like', () => {
    let planet = new EarthLike();
    expect(planet.components[POPULATION_COMP]).not.toBeUndefined();
  });
});