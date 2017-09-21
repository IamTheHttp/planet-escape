/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Entity from 'gameEngine/Entity';
import userInputSystem, {pushAction, attack} from 'gameEngine/systems/userInputSystem';
import {getFighters} from 'gameEngine/components/HasFighters';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import Mothership from 'gameEngine/entities/Ships/Mothership';
import Farm from 'gameEngine/entities/planetBuildings/Farm';
import {
  BUILDINGS_COMP,
  PLAYER_CONTROLLED,
  POSITION,
  OWNER_COMPONENT,
  MOVE,
  SELECT,
  COLONIZE,
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  ATTACK
} from 'gameEngine/constants';
describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
    Entity.reset();
  });

  it('Tests an action without entities', () => {
    // pushing an action with no entities
    pushAction({
      name : 'addPop'
    });
    // the system doesn't even process it's input if there are no valid actions
    userInputSystem('asdsdfs');
    // the success of this test is that nothing throws exceptions, function returns nothing
  });

  it('Tests an invalid action(no name)', () => {
    // pushing an action with no entities
    pushAction({
      entities : [1]
    });
    userInputSystem('asdsdfs');
    // the system doesn't even process it's input if there are no valid actions
    // the success of this test is that nothing throws exceptions, function returns nothing
  });

  it('Tests the build action', () => {
    let planet = new EarthLike('foo', 50, 100, 100);
    let building = new Farm();

    pushAction({
      entities : {[planet.id] : planet}, // on what entities to build
      name : 'build', // action? (build)
      entityID : building.id // what to build
    });

    userInputSystem();
    expect(Entity.entities[planet.id][BUILDINGS_COMP].inProgress.length).toBe(1);
    expect(Entity.entities[planet.id][BUILDINGS_COMP].inProgress[0].constructor).toBe(Farm);
  });

  it('Tests that an entity can be selected', () => {
    let planet = new EarthLike('foo', 50, 100, 100);

    pushAction({
      name:SELECT,
      x : 500,
      y : 500
    });
    userInputSystem();
    expect(planet[PLAYER_CONTROLLED].selected).toBe(false);

    pushAction({
      name:SELECT,
      x : 100,
      y : 104.99
    });
    userInputSystem();
    expect(planet[PLAYER_CONTROLLED].selected).toBe(true);

    pushAction({
      name:'select',
      x : 104.99,
      y : 100
    });
    userInputSystem();
    expect(planet[PLAYER_CONTROLLED].selected).toBe(true);
  });

  it('Tests that an entity can be moved', () => {
    let planet = new EarthLike('foo', 50, 100, 100);

    // set as selected
    planet[PLAYER_CONTROLLED].selected = true;
    pushAction({
      name:MOVE,
      x : 105,
      y : 100
    });
    userInputSystem();
    expect(planet[POSITION].destY).toBe(100);
    expect(planet[POSITION].destX).toBe(105);
  });

  it('Tests that an entity can be colonized', () => {
    let planet = new EarthLike('foo', 50, 100, 100, NEUTRAL);
    let ship = new Mothership(50, 50, PLAYER_1);
    // set as selected

    // planet[PLAYER_CONTROLLED].selected = true;
    pushAction({
      name:COLONIZE,
      x : 105,
      y : 100
    });
    expect(planet[OWNER_COMPONENT].player).toBe(NEUTRAL);
    userInputSystem();
    // since nothing is selected, we can't colonize!
    expect(planet[OWNER_COMPONENT].player).toBe(NEUTRAL);

    // set as selected
    ship[PLAYER_CONTROLLED].selected = true;
    pushAction({
      name:COLONIZE,
      x : 105,
      y : 100
    });
    expect(planet[OWNER_COMPONENT].player).toBe(NEUTRAL);
    userInputSystem();
    expect(planet[OWNER_COMPONENT].player).toBe(PLAYER_1);
  });

  it('Colonization only works when in range', () => {
    let planet = new EarthLike('foo', 50, 100, 100, NEUTRAL);
    let ship = new Mothership(600, 600, PLAYER_1);
    // set as selected

    pushAction({
      name:COLONIZE,
      x : 105,
      y : 100
    });
    ship[PLAYER_CONTROLLED].selected = true;
    expect(planet[OWNER_COMPONENT].player).toBe(NEUTRAL);
    userInputSystem();
    // since we're out of range
    expect(planet[OWNER_COMPONENT].player).toBe(NEUTRAL);
  });

  it('Attacking action will set destination of fighters', () => {
    let attackingPlanet = new EarthLike('foo', 50, 200, 200, PLAYER_1);
    attackingPlanet[PLAYER_CONTROLLED].selected = true;
    let defendingPlanet = new EarthLike('foo', 50, 100, 100, PLAYER_2);
    let attackFighter = new Fighter(attackingPlanet);

    expect(getFighters(attackingPlanet).length).toBeGreaterThan(0);

    pushAction({
      name:ATTACK,
      x : 100,
      y : 100
    });

    userInputSystem(); // this sets the attack, but does not execute it
    expect(attackFighter[POSITION].destX).toBe(100);
    expect(attackFighter[POSITION].destY).toBe(100);
  });
});