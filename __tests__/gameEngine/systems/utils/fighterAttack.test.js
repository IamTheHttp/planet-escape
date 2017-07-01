/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount , shallow} from 'enzyme';
import React from 'react';
import {getOwner} from 'gameEngine/components/OwnerComponent';
import fighterAttacks from 'gameEngine/systems/fighterAttacks';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import Entity from 'gameEngine/Entity';
import {getFighters} from 'gameEngine/components/HasFighters';
import {
  PLAYER_1,
  PLAYER_2,
  POSITION,
  IS_DOCKED
} from 'gameEngine/constants';

describe('Tests a component',() => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('Attack/Defense are removed from the Entity hash as well from the planets',() => {
    let attackingPlanet = new EarthLike('source',50,200,200,PLAYER_1);
    let defendingPlanet = new EarthLike('target',50,500,500,PLAYER_2);

    let attackerFighter = new Fighter(attackingPlanet);
    let defFighter = new Fighter(defendingPlanet);
    new Fighter(defendingPlanet); // 2nd defender


    attackerFighter[POSITION].x = attackerFighter[POSITION].destX = 500;
    attackerFighter[POSITION].y = attackerFighter[POSITION].destY = 500;
    attackerFighter[IS_DOCKED].isDocked = false;

    let defCount = getFighters(defendingPlanet).length;
    let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();
    // expect the attackerFighter entity to be removed from the entity list...
    expect(Entity.entities[attackerFighter.id]).toBeUndefined();
    expect(Entity.entities[defFighter.id]).toBeUndefined();

    // the planets should lose one fighter
    expect(getFighters(defendingPlanet).length).toBe(defCount - 1);
    expect(getFighters(attackingPlanet).length).toBe(attackCount - 1);
    expect(getOwner(defendingPlanet)).toBe(PLAYER_2);
  });

  it('TODO - A fighter from another player is at a planet with no defender');
});