/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Entity from 'gameEngine/Entity';
import {destroyFighter, getFighters} from 'gameEngine/components/HasFighters';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {
  PLAYER_1
} from 'gameEngine/constants';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('renders', () => {
    let planet = new EarthLike(20, 50, 300, 300, PLAYER_1);
    new Fighter(planet);
    let fighters = getFighters(planet);
    let len = fighters.length;
    expect(len).toBeGreaterThan(0);
    destroyFighter(fighters[0]);
    expect(fighters.length).toBe(len - 1);
  });
});