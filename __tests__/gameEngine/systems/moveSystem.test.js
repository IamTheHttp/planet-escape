/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import moveSystem from 'gameEngine/systems/moveSystem';
import {
  POSITION
} from 'gameEngine/constants';
import Mothership from 'gameEngine/entities/Ships/Mothership';
describe('Tests a component', () => {
  beforeEach(() => {
      // setup the test
  });

  it('moves entities to bigger x,y', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 200;
    const DEST_POS_Y = 200;

    let ship = new Mothership(START_POS_X,START_POS_Y);

    let entities = {
      [ship.id] : ship
    };
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem(entities);

    expect(ship[POSITION].x).toBeGreaterThan(START_POS_X);
    expect(ship[POSITION].y).toBeGreaterThan(START_POS_Y);
  });

  it('moves entities to smaller x,y', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 50;
    const DEST_POS_Y = 50;

    let ship = new Mothership(START_POS_X,START_POS_Y);

    let entities = {
      [ship.id] : ship
    };
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem(entities);

    expect(ship[POSITION].x).toBeLessThan(START_POS_X);
    expect(ship[POSITION].y).toBeLessThan(START_POS_Y);
  });

  it('if dest is reached, we do nothing', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 100;
    const DEST_POS_Y = 100;

    let ship = new Mothership(START_POS_X,START_POS_Y);

    let entities = {
      [ship.id] : ship
    };
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem(entities);

    expect(ship[POSITION].x).toBe(START_POS_X);
    expect(ship[POSITION].y).toBe(START_POS_Y);
  });
});