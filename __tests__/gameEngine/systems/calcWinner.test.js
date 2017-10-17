/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import calcWinner from 'gameEngine/systems/calcWinner';
import Entity from 'gameEngine/Entity';
import {
  POSITION,
  PLAYER_1,
  PLAYER_2,
  GAME_WON,
  GAME_LOST
} from 'gameEngine/constants';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
    // setup the test
  });

  it('Calcs the winner based on entities - game won', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    new EarthLike(START_POS_X, START_POS_Y, PLAYER_1);
    expect(calcWinner()).toBe(GAME_WON);
  });

  it('Calcs the winner based on entities - game lost', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    new EarthLike(START_POS_X, START_POS_Y, PLAYER_2);
    expect(calcWinner()).toBe(GAME_LOST);
  });
});