/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';

import Farm from 'gameEngine/entities/planetBuildings/Farm';
import {UI_COMP} from 'gameEngine/constants';
describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('renders', () => {
    let farm = new Farm();

    expect(farm[UI_COMP]).toBeUndefined();
  });

  it('renders', () => {
    let farm = new Farm(true);

    expect(farm[UI_COMP]).not.toBeUndefined();
  });
});