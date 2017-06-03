/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import userInputSystem from 'gameEngine/ecs/systems/userInputSystem'
import {pushAction} from 'gameEngine/ecs/systems/userInputSystem'

import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import Farm from 'gameEngine/ecs/entities/planetBuildings/Farm';
import {
  BUILDINGS_COMP,
  PLAYERCONTROLLED_COMP,
  POSITION_COMP
} from 'gameEngine/constants';
describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('Tests an action without entities', function () {
    //pushing an action with no entities
    pushAction({
      name : 'addPop'
    });
    userInputSystem('asdsdfs'); //the system doesn't even process it's input if there are no valid actions
    //the success of this test is that nothing throws exceptions, since this function returns nothing
  });

  it('Tests an invalid action(no name)', function () {
    //pushing an action with no entities
    pushAction({
      entities : [1]
    });
    userInputSystem('asdsdfs'); //the system doesn't even process it's input if there are no valid actions
    //the success of this test is that nothing throws exceptions, since this function returns nothing
  });

  it('Tests the build action', function () {
    let planet = new EarthLike('foo',50,100,100);
    let building = new Farm();

    let entities = {
      [planet.id] : planet,
      [building.id] : building
    };

    pushAction({
      entities : [planet.id], //on what entities to build
      name : 'build', //action? (build)
      entityID : building.id //what to build
    });

    userInputSystem(entities); //the system doesn't even process it's input if there are no valid actions
    expect(entities[planet.id][BUILDINGS_COMP].inProgress.length).toBe(1);
    expect(entities[planet.id][BUILDINGS_COMP].inProgress[0].constructor).toBe(Farm);
  });

  it('Tests that an entity can be selected', function () {
    let planet = new EarthLike('foo',50,100,100);

    let entities = {
      [planet.id] : planet,
    };

    pushAction({
      name:'select',
      x : 500,
      y : 500,
    });
    userInputSystem(entities);
    expect(planet[PLAYERCONTROLLED_COMP].selected).toBe(false);

    pushAction({
      name:'select',
      x : 100,
      y : 104.99,
    });
    userInputSystem(entities);
    expect(planet[PLAYERCONTROLLED_COMP].selected).toBe(true);

    pushAction({
      name:'select',
      x : 104.99,
      y : 100,
    });
    userInputSystem(entities);
    expect(planet[PLAYERCONTROLLED_COMP].selected).toBe(true);
  });

  it('Tests that an entity can be selected', function () {
    let planet = new EarthLike('foo',50,100,100);

    let entities = {
      [planet.id] : planet,
    };

    // set as selected
    planet[PLAYERCONTROLLED_COMP].selected = true;
    pushAction({
      name:'move',
      x : 105,
      y : 100,
    });
    userInputSystem(entities);
    expect(planet[POSITION_COMP].destY).toBe(100);
    expect(planet[POSITION_COMP].destX).toBe(105);
  });
});