/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlanetResources from 'gameEngine/ecs/components/PopulationComponent';
describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('init new component', function () {
      let p = new PlanetResources(5);
      expect(p.value).toBe(5);
      expect(p.value).toBe(5);
    });
});