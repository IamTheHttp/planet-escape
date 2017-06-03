/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import Mine from 'gameEngine/ecs/entities/planetBuildings/Mine'
import {UI_COMP} from 'gameEngine/constants';
describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('renders', function () {
    let mine = new Mine();

    expect(mine[UI_COMP]).toBeUndefined();

  });

  it('renders', function () {
    let mine = new Mine(true);

    expect(mine[UI_COMP]).not.toBeUndefined();

  });
});