
import {mount, shallow} from 'enzyme';
import React from 'react';
import entityLoop from '../../../src/lib/ECS/util/entityLoop.js';
import buildFighters from 'gameEngine/systems/buildFighters';
import {getFighters} from 'gameEngine/components/HasFighters';
import EarthLike from 'gameEngine/entities/planets/EarthLike';

import {
  NEUTRAL,
  PLAYER_1
} from 'gameEngine/constants';

describe('Tests a component', () => {
  let systemArguments;
  beforeEach(() => {
    // setup the test
    systemArguments = {
      count: 0
    };
  });

  it('neutral planets do not build fighters', () => {
    let earth = new EarthLike(200, 200, NEUTRAL);
    buildFighters(systemArguments);
    expect(getFighters(earth).length).toBe(0);
  });

  it('player owned planets produce fighters', () => {
    let earth = new EarthLike(200, 200, PLAYER_1);
    buildFighters(systemArguments);
    expect(getFighters(earth).length).toBe(1);
  });
});