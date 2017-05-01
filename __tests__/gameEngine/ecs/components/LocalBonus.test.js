/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlanetBonus from 'gameEngine/ecs/components/PlanetBonusComponent';
describe('Tests a component', function () {

  beforeEach(function () {
    //setup the test
  });

  it('init new component', function () {
    let p = new PlanetBonus(5);
    expect(p.bonuses).toEqual({});
  });
});