/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import popGrowthSystem from 'gameEngine/ecs/systems/popGrowthSystem';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';

import {POPULATION_COMP} from 'gameEngine/constants';
describe('Tests a popGorwthSystem', function () {

    beforeEach(function () {
        //setup the test
    });

    it('test tick', function () {
      let ents = {
        '1' : new EarthLike('earth',1)
      };
      popGrowthSystem(ents);
      expect(ents[1].components[POPULATION_COMP].value).toEqual(1.005);
    });
});