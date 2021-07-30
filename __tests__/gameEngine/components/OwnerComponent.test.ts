
import {mount, shallow} from 'enzyme';
import React from 'react';
import Owner, {hasOwner} from 'gameEngine/components/OwnerComponent';

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('renders', () => {
    let owner = new Owner();
    expect(owner.player).not.toBeUndefined();
  });
});