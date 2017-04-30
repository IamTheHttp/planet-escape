/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import CostComponent from 'gameEngine/ecs/components/CostsComponent';
describe('Tests a component', function () {

  beforeEach(function () {
    //setup the test
  });

  it('init new component', function () {
    let p = new CostComponent();
    expect(p.items).toEqual({});
  });
});