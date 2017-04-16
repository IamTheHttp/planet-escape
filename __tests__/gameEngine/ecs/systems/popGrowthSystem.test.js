/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import popGrowthSystem from 'gameEngine/ecs/systems/popGrowthSystem';

describe('Tests a popGorwthSystem', function () {

    beforeEach(function () {
        //setup the test
    });

    it('test tick', function () {
      let ents = {
        '1' : {
          components : {population:{name:'population',value:1}}
        }
      };
      popGrowthSystem(ents);
      expect(ents[1].components['population'].value).toEqual("0.95");
    });
});