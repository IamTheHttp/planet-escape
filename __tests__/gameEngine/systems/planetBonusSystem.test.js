/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import planetBonusesSystem from 'gameEngine/systems/planetBonusesSystem';
import {getBase,getMod} from 'gameEngine/components/PlanetBonusComponent';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Farm from 'gameEngine/entities/planetBuildings/Farm';
import Mine from 'gameEngine/entities/planetBuildings/Mine';
import {
  PLANETBONUS_COMP,
  BUILDINGS_COMP,
  FOOD_RESOURCE
} from 'gameEngine/constants';
describe('Tests the construction system', () => {
  beforeEach(() => {
    // setup the test
  });

  it('does stuff',() => {
    let planet = new EarthLike('planet',10);
    let entities = {
      [planet.id] : planet
    };

    planet[BUILDINGS_COMP].built.push(new Farm());
    planet[BUILDINGS_COMP].built.push(new Mine());
    planetBonusesSystem(entities);

    // shouldn't be equal as bonuses were added in the farm
    let base = getBase(planet,FOOD_RESOURCE);
    let mod = getMod(planet,FOOD_RESOURCE);
    expect(mod).not.toEqual(base);
  });
});