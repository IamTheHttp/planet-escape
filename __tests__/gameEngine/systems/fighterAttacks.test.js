/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import {getOwner} from 'gameEngine/components/OwnerComponent';
import InPlaceToAttack from 'gameEngine/components/InPlaceToAttack';
import fighterAttacks from 'gameEngine/systems/fighterAttacks';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter, {fighterPool} from 'gameEngine/entities/Ships/Fighter';
import Entity from '../../../src/lib/ECS/Entity';
import {getFighters, stopDefending} from 'gameEngine/components/HasFighters';
import {
  PLAYER_1,
  PLAYER_2,
  NEUTRAL,
  POSITION,
  DEFENDING,
  IN_PLACE_TO_ATTACK
} from 'gameEngine/constants';

describe('Tests the fighter attacks system', () => {
  beforeEach(() => {
    Entity.reset();
    fighterPool.reset();
  });

  it('Attack/Defense are removed from the Entity hash as well from the planets', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(500, 500, PLAYER_2);

    let attackerFighter = new Fighter(attackingPlanet);
    let defFighter = new Fighter(defendingPlanet);
    let defFighter2 = new Fighter(defendingPlanet); // 2nd defender

    // set dest and position for fighter
    attackerFighter[POSITION].x = attackerFighter[POSITION].destX = 500;
    attackerFighter[POSITION].y = attackerFighter[POSITION].destY = 500;
    attackerFighter.removeComponent(DEFENDING);
    attackerFighter.addComponent(new InPlaceToAttack());

    let defCount = getFighters(defendingPlanet).length;
    let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();

    // expect the attackerFighter entity to be removed from the entity list...
    // well, not exactly removed - more like going a reset.
    expect(Entity.entities[attackerFighter.id][POSITION].x).toBe(null);
    expect(Entity.entities[defFighter.id][POSITION].x).toBe(null);

    // the planets should lose one fighter
    expect(getFighters(defendingPlanet).length).toBe(defCount - 1);
    expect(getFighters(attackingPlanet).length).toBe(attackCount - 1);
    expect(getOwner(defendingPlanet)).toBe(PLAYER_2);
  });

  it('A fighter is attacking a planet with no defenders', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(500, 500, PLAYER_2);

    let attackerFighter = new Fighter(attackingPlanet);
    attackerFighter[POSITION].x = attackerFighter[POSITION].destX = 500;
    attackerFighter[POSITION].y = attackerFighter[POSITION].destY = 500;
    attackerFighter.removeComponent(DEFENDING);
    attackerFighter.addComponent(new InPlaceToAttack());

    let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();
    // expect the attackerFighter entity to be removed from the entity list...
    expect(Entity.entities[attackerFighter.id][POSITION].x).toBe(null);
    // the planets should lose one fighter
    expect(getFighters(attackingPlanet).length).toBe(attackCount - 1);
    expect(getOwner(defendingPlanet)).toBe(getOwner(attackingPlanet));
  });

  /**
   * This situation can happen when there's a fighter in route when the ownership already changed
   */
  it('A fighter attacking a friendly planet with no defenders', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(500, 500, PLAYER_1);

    let attackerFighter = new Fighter(attackingPlanet);
    attackerFighter[POSITION].x = attackerFighter[POSITION].destX = 500;
    attackerFighter[POSITION].y = attackerFighter[POSITION].destY = 500;
    attackerFighter.removeComponent(DEFENDING);
    attackerFighter.addComponent(new InPlaceToAttack());

    let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();

    // We expect the fighter to simply move to the next planet
    expect(Entity.entities[attackerFighter.id][POSITION].x).toBe(500);

    // The sending planet should have one less fighter
    expect(getFighters(attackingPlanet).length).toBe(attackCount - 1);

    // the player should still be player_1 after this
    expect(getOwner(defendingPlanet)).toBe(PLAYER_1);
  });

  it('A fighter attacking an enemy planet that has fighters out..', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(500, 500, PLAYER_2);
    let defendingFriendly = new EarthLike(5000, 5000, PLAYER_1);

    let attackerFighter = new Fighter(attackingPlanet);
    let fighterInSpace = new Fighter(defendingPlanet);

    attackerFighter[POSITION].x = attackerFighter[POSITION].destX = 500;
    attackerFighter[POSITION].y = attackerFighter[POSITION].destY = 500;
    stopDefending(attackerFighter);
    // attackerFighter.removeComponent(DEFENDING);
    attackerFighter.addComponent(new InPlaceToAttack());

    // fighter in space is not defending..
    // this state is handled by the various systems
    stopDefending(fighterInSpace);
    // fighterInSpace.removeComponent(DEFENDING);

    // attacking...
    // let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();

    // // expect the fighterInSpace entity to still be alive, without a planet ID
    expect(Entity.entities[attackerFighter.id][POSITION].x).toBe(null);

    // enemy fighters reach our defenseless planet
    fighterInSpace[POSITION].x = fighterInSpace[POSITION].destX = 5000;
    fighterInSpace[POSITION].y = fighterInSpace[POSITION].destY = 5000;
    fighterInSpace.addComponent(new InPlaceToAttack());
    fighterAttacks();
  });
});