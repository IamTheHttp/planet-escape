/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Mothership from 'gameEngine/ecs/entities/ships/Mothership';
import {POSITION_COMP} from 'gameEngine/constants';

describe('Tests a component', function () {
  beforeEach(function () {
      //setup the test
  });

  it('Ensures a ship has position', function () {
    let ship = new Mothership(200,300);
    expect(ship[POSITION_COMP].x).toBe(200);
    expect(ship[POSITION_COMP].y).toBe(300);
  });
});