/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
/* global global */
import Entity from 'gameEngine/Entity';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {mount, shallow} from 'enzyme';
import React from 'react';

let rand = global.Math.random;
global.Math.random = () => {
  return 0;
};

import {POSITION, MAP_SIZE, PLAYER_1, CANVAS_X, CANVAS_Y, PLAYER_2, PLANET_BUFFER} from 'gameEngine/constants.js';
import placeEntities from 'shared/placementUtil';

import createGrid from 'shared/mapPlacement/grid';
import getGridBlockFromPos from 'shared/mapPlacement/getGridBlockFromPos';
import canCircleBePlacedInPos from 'shared/mapPlacement/canCircleBePlacedInPos';
import isBlockRangeOccupied from 'shared/mapPlacement/isBlockRangeOccupied';
import placeEntityInGrid from 'shared/mapPlacement/placeEntityInGrid';
import gameConfig from 'gameEngine/config';
let mapSize = gameConfig[MAP_SIZE];

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
    let block = getGridBlockFromPos(grid, 0, 0);
    expect(block.col).toBe(0);
    expect(block.row).toBe(0);

    block = getGridBlockFromPos(grid, 980, 995);
    expect(block.col).toBe(98);
    expect(block.row).toBe(99);
  });

  it('Place circle inside an entire grid block', () => {
    let grid = createGrid(area, squaresInLine);
    let x = 10;
    let y = 10;
    let radius = 5;
    expect(canCircleBePlacedInPos(x, y, radius, grid)).toBe(true);
    grid[0][0].occupied = true;
    expect(canCircleBePlacedInPos(x, y, radius, grid)).toBe(false);
    grid[0][0].occupied = false;
    expect(canCircleBePlacedInPos(0, 0, 3000, grid)).toBe(false);
    expect(canCircleBePlacedInPos(0, 0, 2, grid)).toBe(false);
  });

  it('Given two grid blocks, determines if the space betwee them is clear', () => {
    let grid = createGrid(area, squaresInLine);
    expect(isBlockRangeOccupied(grid[0][0], grid[1][1], grid)).toBe(false);
    expect(isBlockRangeOccupied(grid[0][0], grid[9][9], grid)).toBe(false);
    grid[6][6].occupied = true;
    expect(isBlockRangeOccupied(grid[0][0], grid[9][9], grid)).toBe(true);
  });

  it('places an entity in pos', () => {
    let grid = createGrid(area, squaresInLine);
    let ent = new EarthLike(null, null);
    placeEntityInGrid(ent, 30, 30, ent[POSITION].radius, grid);
    expect(ent[POSITION].x).toBe(30);
    expect(ent[POSITION].y).toBe(30);
  });

  it('Starting the entityPlacer with entities that have X/Y occupies grid correctly', () => {
    let planets = [];
    let p1 = new EarthLike(50, 50, PLAYER_1);
    let p2 = new EarthLike(area.bottomRightAreaX - 50, area.bottomRightAreaY - 50, PLAYER_2);
    planets[p1.id] = p1;
    planets[p2.id] = p2;
    let grid = placeEntities(planets, area, 1);
    expect(grid[5][5].occupied).toBe(true);
  });
});