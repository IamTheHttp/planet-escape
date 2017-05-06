/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import popGrowthSystem from 'gameEngine/ecs/systems/popGrowthSystem';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';

import {POPULATION_COMP,PLANETBONUS_COMP,FOOD_RESOURCE} from 'gameEngine/constants';
describe('Tests a popGorwthSystem', function () {

    beforeEach(function () {
        //setup the test
    });

    it('test tick', function () {

      let basePop = 1;
      let planet = new EarthLike('earth',basePop);
      let ents = {
        [planet.id] : planet
      };

      planet[PLANETBONUS_COMP].mod = {
        [FOOD_RESOURCE] : 2
      };
      popGrowthSystem(ents);
      expect(planet[POPULATION_COMP].value).toEqual(basePop*1.005); //internal growth rate
    });

  it('test tick', function () {
    let planet = new EarthLike('earth',1);
    let ents = {
      [planet.id] : planet
    };

    planet[PLANETBONUS_COMP].mod = {
      [FOOD_RESOURCE] : 0
    };
    popGrowthSystem(ents);

    expect(planet[POPULATION_COMP].value).toEqual(1); //min 1
  });

});