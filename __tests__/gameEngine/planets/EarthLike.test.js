/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import EarthLike from 'gameEngine/planets/EarthLike';
describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('init earth like', function () {
      let planet = new EarthLike();
      expect(planet.components.population).not.toBeUndefined();
    });
});