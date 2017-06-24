/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlanetSizeComponent from 'gameEngine/components/PlanetSizeComponent';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('init new component', () => {
    let comp = new PlanetSizeComponent();
    expect(comp.value).toEqual(100);
  });

  it('init new component with value', () => {
    let comp = new PlanetSizeComponent(200);
    expect(comp.value).toEqual(200);
  });
});