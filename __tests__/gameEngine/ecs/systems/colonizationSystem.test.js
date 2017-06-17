/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import colonizationSystem from 'src/gameEngine/ecs/systems/colonizationSystem';
import {
  OWNER_COMPONENT,
  POPULATION_COMP,
  BASE_POP,
  BUILDINGS_COMP
} from 'gameEngine/constants';


describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('colonization empties buildings, resets pop and removes last colonized time', function () {
    let planet = new EarthLike('planet',10);
    planet[OWNER_COMPONENT].playerChangeTime = +(new Date());

    let entities = {
      [planet.id] : planet
    };
    colonizationSystem(entities);
    expect(planet[POPULATION_COMP].value).toBe(BASE_POP);
    expect(planet[BUILDINGS_COMP].built).toEqual([]);
    expect(planet[BUILDINGS_COMP].inProgress).toEqual([]);
    expect(planet[OWNER_COMPONENT].playerChangeTime).toBe(false);
  });
});