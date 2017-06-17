/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Owner from 'gameEngine/ecs/components/OwnerComponent';

describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('renders', function () {
    let owner = new Owner();
    expect(owner.player).not.toBeUndefined();
  });
});