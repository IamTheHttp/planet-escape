/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Entity from '../../../src/lib/ECS/Entity';
import userInputSystem, {pushAction, attack} from 'gameEngine/systems/userInputSystem';
import {getFighters} from 'gameEngine/components/HasFighters';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {
  BUILDINGS_COMP,
  PLAYER_CONTROLLED,
  POSITION,
  OWNER_COMPONENT,
  MOVE,
  CLICK,
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  ATTACK
} from 'gameEngine/constants';


function getSelectedBox(x, y) {
  return {
    start : {
      x,
      y
    },
    end : {
      x,
      y
    }
  };
}

describe('Tests the user input system', () => {
  beforeEach(() => {
      // setup the test
    Entity.reset();
  });

  it('placeholder', () => {

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


  it('Tests that an entity can be selected', () => {
    let planet = new EarthLike(100, 100, PLAYER_1);


    // hits is provided by the game-platform library
    // it will contain the IDs of the hit items
    pushAction({
      hits: [],
      name:CLICK,
      x : 500, // these don't really matter, as the hits are calculated internally by game-platform
      y : 500,
      selectedBox : getSelectedBox(500, 500)
    });
    userInputSystem();
    expect(planet[PLAYER_CONTROLLED].selected).toBe(false);

    pushAction({
      hits: [planet.id],
      name:CLICK,
      x : 100, // these don't really matter, as the hits are calculated internally by game-platform
      y : 104.99,
      selectedBox : getSelectedBox(100, 104.99)
    });
    userInputSystem();
    expect(planet[PLAYER_CONTROLLED].selected).toBe(true);

    pushAction({
      hits: [planet.id],
      name: CLICK,
      x : 99999999999, // these don't really matter, as the hits are calculated internally by game-platform
      y : 5000000,
      selectedBox : getSelectedBox(104.99, 100)
    });
    userInputSystem();
    expect(planet[PLAYER_CONTROLLED].selected).toBe(true);
  });


  it('Attacking action will set destination of fighters', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(100, 100, PLAYER_2);
    let attackFighter = new Fighter(attackingPlanet);

    attackingPlanet[PLAYER_CONTROLLED].selected = true;

    expect(getFighters(attackingPlanet).length).toBeGreaterThan(0);

    pushAction({
      hits: [defendingPlanet.id],
      name:CLICK,
      x : 100,
      y : 100
    });

    userInputSystem(); // this sets the attack, but does not execute it
    expect(attackFighter[POSITION].destX).toBe(100);
    expect(attackFighter[POSITION].destY).toBe(100);
  });
});