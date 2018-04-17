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
import Fighter from 'gameEngine/entities/Ships/Fighter';
import Entity from 'gameEngine/Entity';
import {getFighters} from 'gameEngine/components/HasFighters';
import {
  PLAYER_1,
  PLAYER_2,
  NEUTRAL,
  POSITION,
  IS_DOCKED,
  IN_PLACE_TO_ATTACK
} from 'gameEngine/constants';

describe('Tests a the fighter attacks system', () => {
  beforeEach(() => {
    Entity.reset();
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
    attackerFighter.addComponent(new InPlaceToAttack());

    // console.log(attackerFighter);
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

  it('A fighter is attacking a planet with no defenders', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(500, 500, PLAYER_2);

    let attackerFighter = new Fighter(attackingPlanet);
    attackerFighter[POSITION].x = attackerFighter[POSITION].destX = 500;
    attackerFighter[POSITION].y = attackerFighter[POSITION].destY = 500;
    attackerFighter.addComponent(new InPlaceToAttack());

    let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();
    // expect the attackerFighter entity to be removed from the entity list...
    expect(Entity.entities[attackerFighter.id]).toBeUndefined();
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
    attackerFighter.addComponent(new InPlaceToAttack());

    let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();
    // expect the attackerFighter entity to be removed from the entity list...
    expect(Entity.entities[attackerFighter.id]).toBeUndefined();
    // the planets should lose one fighter
    expect(getFighters(attackingPlanet).length).toBe(attackCount - 1);
    expect(getOwner(defendingPlanet)).toBe(PLAYER_1);
  });

  it('A fighter attacking a an enemy planet that has fighters out..', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(500, 500, PLAYER_2);
    let defendingFriendly = new EarthLike(5000, 5000, PLAYER_1);

    let attackerFighter = new Fighter(attackingPlanet);
    let fighterInSpace = new Fighter(defendingPlanet);

    // attacker reache destination
    attackerFighter[POSITION].x = attackerFighter[POSITION].destX = 500;
    attackerFighter[POSITION].y = attackerFighter[POSITION].destY = 500;
    attackerFighter.addComponent(new InPlaceToAttack());

    // defending fighter is away
    fighterInSpace[POSITION].x = 1000;
    fighterInSpace[POSITION].y = 1000;
    fighterInSpace[IS_DOCKED].isDocked = false;

    // attacking...
    // let attackCount = getFighters(attackingPlanet).length;
    fighterAttacks();

    // expect the fighterInSpace entity to still be alive, without a planet ID
    expect(Entity.entities[fighterInSpace.id].planetID).toBeUndefined();

    // enemy fighters reach our defenseless planet
    fighterInSpace[POSITION].x = fighterInSpace[POSITION].destX = 5000;
    fighterInSpace[POSITION].y = fighterInSpace[POSITION].destY = 5000;
    fighterAttacks();
    //
    // expect(getOwner(defendingFriendly)).toBe(PLAYER_2);
    // the planets should lose one fighter
    // expect(getFighters(attackingPlanet).length).toBe(attackCount - 1);
    // expect(getOwner(defendingPlanet)).toBe(PLAYER_1);
  });
});