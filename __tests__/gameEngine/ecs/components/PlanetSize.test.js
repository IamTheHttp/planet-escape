/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import PlanetSizeComponent from 'gameEngine/ecs/components/PlanetSizeComponent';
describe('Tests a component', function () {

  beforeEach(function () {
    //setup the test
  });

  it('init new component', function () {
    let p = new PlanetSizeComponent();
    expect(p.value).toEqual(100);
  });

  it('init new component with value', function () {
    let p = new PlanetSizeComponent(200);
    expect(p.value).toEqual(200);
  });
});