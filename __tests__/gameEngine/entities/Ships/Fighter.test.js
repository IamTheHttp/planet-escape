/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {POSITION} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
  });

  it('Ensures a fighter has position', () =>  {
    let planet = new EarthLike('foo',50,200,300);
    let ship = new Fighter(planet);
    expect(ship[POSITION].x).toBe(200);
    expect(ship[POSITION].y).toBe(300);
  });
});