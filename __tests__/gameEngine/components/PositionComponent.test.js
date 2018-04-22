/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PositionComponent, {hasDest, setDest} from 'gameEngine/components/PositionComponent';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Entity from '../../../src/lib/ECS/Entity';
import {
  PLAYER_1,
  POSITION
} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('init new component', () => {
    let planet = new EarthLike(100, 100, PLAYER_1);
    expect(hasDest(planet)).toBe(false);
  });

  it('init new component', () => {
    let planet = new EarthLike(100, 100, PLAYER_1);

    let targetPlanet = new EarthLike(300, 300, PLAYER_1);
    setDest(planet, targetPlanet);
    expect(hasDest(planet)).toBe(true);
  });
});