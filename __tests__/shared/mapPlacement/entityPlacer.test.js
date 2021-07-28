
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import entityPlacer from 'shared/mapPlacement/entityPlacer';
import createGrid from 'shared/mapPlacement/grid';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import logger from 'shared/logger';
describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
    logger.error = jest.fn();
    logger.log = jest.fn();
  });

  it('Tests an incorrect placement, this should trigger an error', () => {
    expect(logger.error.mock.calls.length).toBe(0);
    let area = {
      topLeftAreaX: 0,
      topLeftAreaY: 0,
      bottomRightAreaX: 100,
      bottomRightAreaY: 100
    };
    let grid = createGrid(area, 10);

    new EarthLike(1000, 1000);

    let entities = [
      new EarthLike(1000, 1000)
    ];
    entityPlacer(entities, grid, 0);
    expect(logger.error.mock.calls.length).toBe(1);
  });
});