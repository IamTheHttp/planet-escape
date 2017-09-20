/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Mothership from 'gameEngine/entities/Ships/Mothership';
import {POSITION} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
  });

  it('Ensures a ship has position', () => {
    let ship = new Mothership(200, 300);
    expect(ship[POSITION].x).toBe(200);
    expect(ship[POSITION].y).toBe(300);
  });
});