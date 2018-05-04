/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import Entity from '../../../src/lib/ECS/Entity';;
import {mount, shallow} from 'enzyme';
import React from 'react';
import moveSystem from 'gameEngine/systems/moveSystem';
import Moving from 'gameEngine/components/Moving';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter, {fighterPool} from 'gameEngine/entities/Ships/Fighter';

import {
  POSITION,
  MOVE
} from 'gameEngine/constants';
describe('Tests a component', () => {
  let planet;
  let ship;
  beforeEach(() => {
    // TODO - Move to utility that resets the tests
    Entity.reset();
    fighterPool.reset();
    ship = new Fighter(new EarthLike(1234, 1234));
    ship.addComponent(new Moving(true));
      // setup the test
  });

  it('moves entities to bigger x,y', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 200;
    const DEST_POS_Y = 200;

    ship[POSITION].x = START_POS_X;
    ship[POSITION].y = START_POS_Y;
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem();


    expect(ship[POSITION].x).toBeGreaterThan(START_POS_X);
    expect(ship[POSITION].y).toBeGreaterThan(START_POS_Y);
  });

  it('moves entities to smaller x,y', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 50;
    const DEST_POS_Y = 50;
    ship[POSITION].x = START_POS_X;
    ship[POSITION].y = START_POS_Y;
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem();

    expect(ship[POSITION].x).toBeLessThan(START_POS_X);
    expect(ship[POSITION].y).toBeLessThan(START_POS_Y);
  });

  it('if dest is reached, we do nothing', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 100;
    const DEST_POS_Y = 100;

    ship[POSITION].x = START_POS_X;
    ship[POSITION].y = START_POS_Y;
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem();

    expect(ship[POSITION].x).toBe(START_POS_X);
    expect(ship[POSITION].y).toBe(START_POS_Y);
  });

  it('test moving only on X axis', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 300;
    const DEST_POS_Y = 100;

    ship[POSITION].x = START_POS_X;
    ship[POSITION].y = START_POS_Y;
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem();

    expect(ship[POSITION].x).toBeGreaterThan(START_POS_X);
    expect(ship[POSITION].y).toBe(START_POS_Y);
  });
  //
  it('test moving only on Y axis', () => {
    const START_POS_X = 100;
    const START_POS_Y = 100;
    const DEST_POS_X = 100;
    const DEST_POS_Y = 300;

    ship[POSITION].x = START_POS_X;
    ship[POSITION].y = START_POS_Y;
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem();

    expect(ship[POSITION].x).toBe(START_POS_X);
    expect(ship[POSITION].y).toBeGreaterThan(START_POS_Y);
  });

  it('test moving only on Y axis - backwards', () => {
    const START_POS_X = 100;
    const START_POS_Y = 300;
    const DEST_POS_X = 100;
    const DEST_POS_Y = 100;

    ship[POSITION].x = START_POS_X;
    ship[POSITION].y = START_POS_Y;
    ship[POSITION].destX = DEST_POS_X;
    ship[POSITION].destY = DEST_POS_Y;
    moveSystem();

    expect(ship[POSITION].x).toBe(START_POS_X);
    expect(ship[POSITION].y).toBeLessThan(START_POS_Y);
  });
});