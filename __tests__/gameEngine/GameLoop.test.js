/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import GameLoop from 'gameEngine/Game';
import {generateMap} from 'shared/utils';
import Entity from '../../src/lib/ECS/Entity';
import entityLoop from '../../src/lib/ECS/util/entityLoop.js';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import gameConfig from 'gameEngine/config';
import {
  MEDIUM,
  MAP_SIZE,
  PLANETS_IN_MAP,
  DIFFICULTY,
  EASY
} from 'gameEngine/constants';
let mapSize = gameConfig[MAP_SIZE][MEDIUM];
let difficulty = gameConfig[DIFFICULTY][EASY];

function getEntityOfType(className) {
  let resp = [];
  entityLoop(Entity.entities, (ent) => {
    ent.constructor === className && resp.push(ent);
  });
  return resp;
}

describe('Tests a component', () => {
  let planets;
  beforeEach(() => {
    Entity.reset();
    jest.useFakeTimers();
  });

  it('Should pass Entity as callback', () => {
    let cbMock = jest.fn();

    new GameLoop({
      notificationSystem: cbMock,
      renderSystem : () => {},
      mapSize,
      difficulty
    });
    jest.runOnlyPendingTimers();
    expect(cbMock.mock.calls[0][0].Entity).toBe(Entity);
    jest.runOnlyPendingTimers();
  });

  it('Should stop the game', () => {
    window.cancelAnimationFrame = jest.fn();
    new GameLoop({
      notificationSystem: () => {},
      renderSystem : () => {},
      mapSize,
      difficulty
    }).stop();

    expect(cancelAnimationFrame.mock.calls.length).toBe(1);
  });

  it('generates a map with a correct number of planets', () => {
    generateMap(mapSize);
    planets = getEntityOfType(EarthLike);
    expect(planets.length).toBe(mapSize[PLANETS_IN_MAP]);
  });

  it('Pushes an action, test that no exceptions are raised', () => {
    let cbMock = jest.fn();
    let loop = new GameLoop({
      notificationSystem: cbMock,
      renderSystem : () => {},
      mapSize,
      difficulty
    });
    loop.dispatchAction({});
  });
});