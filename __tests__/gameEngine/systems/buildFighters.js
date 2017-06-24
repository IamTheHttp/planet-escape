/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount , shallow} from 'enzyme';
import React from 'react';
import entityLoop from 'gameEngine/systems/utils/entityLoop.js';
import buildFighters from 'gameEngine/systems/buildFighters';
import {getFighters} from 'gameEngine/components/HasFighters';
import EarthLike from 'gameEngine/entities/planets/EarthLike';

import {
  NEUTRAL,
  PLAYER_1
} from 'gameEngine/constants';


describe('Tests a component',() => {
  beforeEach(() => {
    // setup the test
  });

  it('neutral planets do not build fighters',() => {
    let earth = new EarthLike(50,50,200,200,NEUTRAL);
    buildFighters({[earth.id] : earth});
    expect(getFighters(earth).length).toBe(0);
  });

  it('player owned planets produce fighters',() => {
    let earth = new EarthLike(50,50,200,200,PLAYER_1);
    buildFighters({[earth.id] : earth});
    expect(getFighters(earth).length).toBe(1);
  });
});