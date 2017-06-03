/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import MoveComponent from 'gameEngine/ecs/components/MoveComponent'
describe('Tests a component', function () {

    beforeEach(function () {
        //setup the test
    });

    it('inits the component', function () {
      let comp = new MoveComponent(5);
      expect(comp.speed).toBe(5);
    });
});