/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import playerService from 'services/PlayerService';

describe('Tests the playerService', () => {
  beforeEach(() => {
    playerService.reset();
  });

  it('Adds a player', () => {
    playerService.createPlayer('patrick');
    let player = playerService.getPlayer('patrick');

    expect(player).not.toBeFalsy();
    expect(Object.keys(player.levelsPassed).length).toBe(0);
  });

  it('Selects a player', () => {
    playerService.createPlayer('patrick');
    playerService.selectPlayer('patrick');

    expect(playerService.getSelectedPlayer().userName).toBe('patrick');
  });

  it('Allows a user to finish a level, but only once, obviously', () => {
    playerService.createPlayer('patrick');
    playerService.selectPlayer('patrick');

    playerService.finishLevel('first_level');
    playerService.finishLevel('first_level');
    playerService.finishLevel('first_level');
    playerService.finishLevel('first_level');

    expect(Object.keys(playerService.getSelectedPlayer().levelsPassed).length).toBe(1);
  });
});