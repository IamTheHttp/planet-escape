/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
/* global global */
import Entity from 'gameEngine/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import entityLoop from 'gameEngine/systems/utils/entityLoop';

global.Math.random = () => {
  return 0;
};

import PositionComponent from 'gameEngine/components/PositionComponent';
import {
  POSITION
} from 'gameEngine/constants.js';
import {
  getGridBlockFromPos,
  createGrid,
  entityPlacer
} from 'placementUtil';

describe('Tests position', () => {
  let area = {
    topLeftAreaX : 0,
    topLeftAreaY : 0,
    bottomRightAreaX: 1000,
    bottomRightAreaY : 1000
  };
  let squaresInLine = 100;
  beforeEach(() => {
    // setup the test
  });

  it('Creates a grid with 100 items', () => {
    let grid = createGrid(area, squaresInLine);
    expect(grid[0][99]).not.toBeUndefined();
    expect(grid[1][0].topLeftX).not.toBeUndefined();
    expect(grid[50][99]).not.toBeUndefined();
    expect(grid[99][99]).not.toBeUndefined();
    expect(grid[99][99].topLeftX).toBe(990);
    expect(grid[98][99].topLeftY).toBe(980);
  });


  it('Gets back a gridBlock from a grid given a position', () => {
    // each block is 10x10 pixels in this example...
    let grid = createGrid(area, squaresInLine);
    let resp = getGridBlockFromPos(grid, 0, 0);
    expect(resp.col).toBe(0);
    expect(resp.row).toBe(0);

    resp = getGridBlockFromPos(grid, 980, 995);
    expect(resp.col).toBe(98);
    expect(resp.row).toBe(99);
  });

  it('Place entity inside an entire grid block', () => {
    let ent = new Entity();
    ent.addComponent(new PositionComponent(null, null, 1));
    let entities = {
      [ent.id] : ent
    };
    let pos = ent[POSITION];
    // random is always 0 in this test
    // so the POS is always top left
    let grid = entityPlacer(entities, area);
    expect(pos.x).toBe(1);
    expect(pos.y).toBe(1);
    expect(grid[0][0].occupied).toBe(true);
  });

  it('Place entity so it takes four gridBlocks', () => {
    let ent = new Entity();
    ent.addComponent(new PositionComponent(null, null, 50));
    let entities = {
      [ent.id] : ent
    };
    let pos = ent[POSITION];
    // random is always 0 in this test
    // so the POS is always top left
    let grid = entityPlacer(entities, area);
    expect(pos.x).toBe(50);
    expect(pos.y).toBe(50);
    expect(grid[0][0].occupied).toBe(true);
    expect(grid[1][0].occupied).toBe(true);
    expect(grid[0][1].occupied).toBe(true);
    expect(grid[1][1].occupied).toBe(true);
    expect(grid[4][4].occupied).toBe(true);
    expect(grid[5][5].occupied).toBe(true);
    expect(grid[9][10].occupied).toBe(false);
    expect(grid[10][9].occupied).toBe(false);
  });

  it('Tries to place on the edge of the map', () => {
    global.Math.random = () => {
      return 1;
    };

    let ent = new Entity();
    ent.addComponent(new PositionComponent(null, null, 200));
    let entities = {
      [ent.id] : ent
    };
    let pos = ent[POSITION];
    // random is always 0 in this test
    // so the POS is always top left
    let grid = entityPlacer(entities, area);
    expect(pos.x).toBe(null);
    expect(pos.y).toBe(null);
  });
});