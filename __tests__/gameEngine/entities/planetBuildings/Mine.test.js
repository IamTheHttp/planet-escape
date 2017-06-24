/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import Mine from 'gameEngine/entities/planetBuildings/Mine';
import {UI_COMP} from 'gameEngine/constants';
describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
  });

  it('renders', () => {
    let mine = new Mine();

    expect(mine[UI_COMP]).toBeUndefined();
  });

  it('renders', () => {
    let mine = new Mine(true);

    expect(mine[UI_COMP]).not.toBeUndefined();
  });
});