/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import planetBonusesSystem from 'gameEngine/ecs/systems/planetBonusesSystem';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import Farm from 'gameEngine/ecs/entities/planetBuildings/Farm';
import Mine from 'gameEngine/ecs/entities/planetBuildings/Mine';
import {PLANETBONUS_COMP,BUILDINGS_COMP,FOOD_RESOURCE} from 'gameEngine/constants';
describe('Tests the construction system', function () {

  beforeEach(function () {
    //setup the test
  });

  it('does stuff',function(){
    let planet = new EarthLike('planet',10);
    let entities = {
      [planet.id] : planet
    };

    planet[BUILDINGS_COMP].built.push(new Farm());
    planet[BUILDINGS_COMP].built.push(new Mine());
    planetBonusesSystem(entities);

    //shouldn't be equal as bonuses were added in the farm
    expect(planet[PLANETBONUS_COMP].mod[FOOD_RESOURCE]).not.toEqual(planet[PLANETBONUS_COMP].base[FOOD_RESOURCE]);
  });
});