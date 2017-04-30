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
import {LOCALBONUS_COMP,BUILDINGS_COMP,FOOD_COMP} from 'gameEngine/constants';
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
    expect(planet[LOCALBONUS_COMP].mod[FOOD_COMP]).not.toEqual(planet[LOCALBONUS_COMP].base[FOOD_COMP]);
  });
});