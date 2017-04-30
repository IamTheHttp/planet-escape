/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import {POPULATION_COMP} from 'gameEngine/constants';

describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('init earth like', function () {
      let planet = new EarthLike();
      expect(planet.components[POPULATION_COMP]).not.toBeUndefined();
    });
});