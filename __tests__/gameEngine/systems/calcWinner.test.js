/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import calcWinner from 'gameEngine/systems/calcWinner';
import {
  POSITION,
  PLAYER_1,
  GAME_WON
} from 'gameEngine/constants';
import Mothership from 'gameEngine/entities/Ships/Mothership';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('Calcs the winner based on entities', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    let ship = new Mothership(START_POS_X, START_POS_Y, PLAYER_1);
    expect(calcWinner()).toBe(GAME_WON);
  });
});