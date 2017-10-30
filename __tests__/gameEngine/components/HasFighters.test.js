/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Entity from 'gameEngine/Entity';
import {destroyFighter, getFighters, detachFighterFromPlanet} from 'gameEngine/components/HasFighters';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {
  PLAYER_1
} from 'gameEngine/constants';
describe('Tests has fighters component', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('detaching a fighter works as expected', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let attackerFighter = new Fighter(attackingPlanet);
    detachFighterFromPlanet(attackerFighter);
    expect(getFighters(attackingPlanet).length).toBe(0);
  });

  it('destroying a fighter works as expected', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let attackerFighter = new Fighter(attackingPlanet);
    destroyFighter(attackerFighter);
    expect(getFighters(attackingPlanet).length).toBe(0);
  });

  it('destroys a planet successfuly', () => {
    let planet = new EarthLike(20, 50, 300, 300, PLAYER_1);
    new Fighter(planet);
    let fighters = getFighters(planet);
    let len = fighters.length;
    expect(len).toBeGreaterThan(0);
    destroyFighter(fighters[0]);
    expect(getFighters(planet).length).toBe(len - 1);
  });
});