/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Owner from 'gameEngine/components/OwnerComponent';

describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
  });

  it('renders', () => {
    let owner = new Owner();
    expect(owner.player).not.toBeUndefined();
  });
});