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
import {BUILDINGS_COMP} from 'gameEngine/constants';
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

    pushAction({
      entities : [1], //on what entities to build
      name : 'build', //action? (build)
      entityID : 2 //what to build
    });

    let entities = {
      1 : new EarthLike('foo',50),
      2 : new Farm()
    };


    userInputSystem(entities); //the system doesn't even process it's input if there are no valid actions
    expect(entities[1].components[BUILDINGS_COMP].inProgress.length).toBe(1);
    expect(entities[1].components[BUILDINGS_COMP].inProgress[0].constructor).toBe(Farm);
  });

});