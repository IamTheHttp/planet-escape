/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import GameState from 'gameEngine/components/GameState';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Entity from '../../../src/lib/ECS/Entity';
import {
  PLAYER_1,
  IN_PROGRESS,
  GAME_WON
} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('init new component', () => {
    let compDefault = new GameState();
    expect(compDefault.status).toBe(IN_PROGRESS);

    let comp = new GameState(GAME_WON);
    expect(comp.status).toBe(GAME_WON);
  });
});