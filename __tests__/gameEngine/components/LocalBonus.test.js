/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlanetBonus from 'gameEngine/components/PlanetBonusComponent';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('init new component', () => {
    let comp = new PlanetBonus(5);
    expect(comp.bonuses).toEqual({});
  });
});