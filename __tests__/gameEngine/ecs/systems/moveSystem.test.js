/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import moveSystem from 'gameEngine/ecs/systems/moveSystem';
import {
  POSITION_COMP
} from 'gameEngine/constants';
import Mothership from 'gameEngine/ecs/entities/ships/Mothership';
describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('moves entities to bigger coords', function () {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 200;
    const DEST_POS_Y = 200;

    let ship = new Mothership(START_POS_X,START_POS_Y);

    let entities = {
      [ship.id] : ship,
    };
    ship[POSITION_COMP].destX = DEST_POS_X;
    ship[POSITION_COMP].destY = DEST_POS_Y;
    moveSystem(entities);

    expect(ship[POSITION_COMP].x).toBeGreaterThan(START_POS_X);
    expect(ship[POSITION_COMP].y).toBeGreaterThan(START_POS_Y);
  });

  it('moves entities to smaller coords', function () {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 50;
    const DEST_POS_Y = 50;

    let ship = new Mothership(START_POS_X,START_POS_Y);

    let entities = {
      [ship.id] : ship,
    };
    ship[POSITION_COMP].destX = DEST_POS_X;
    ship[POSITION_COMP].destY = DEST_POS_Y;
    moveSystem(entities);

    expect(ship[POSITION_COMP].x).toBeLessThan(START_POS_X);
    expect(ship[POSITION_COMP].y).toBeLessThan(START_POS_Y);
  });
});