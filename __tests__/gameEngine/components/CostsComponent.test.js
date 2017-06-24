/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import CostComponent from 'gameEngine/components/CostsComponent';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('init new component', () => {
    let comp = new CostComponent();
    expect(comp.items).toEqual({});
  });
});