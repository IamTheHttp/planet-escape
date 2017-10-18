/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import GameLoop from 'gameEngine/GameLoop';
import {generateMap} from 'shared/utils';
import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop.js';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {notNeutral} from 'gameEngine/components/OwnerComponent';
import gameConfig from 'gameEngine/config';
import {
  HAS_FIGHTERS,
  FIGHTER_BUILD_RATE,
  PLAYER_1,
  MEDIUM,
  MAP_SIZE,
  PLANETS_IN_MAP
} from 'gameEngine/constants';
let mapSize = gameConfig[MAP_SIZE][MEDIUM];

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
  });

  it('should only pass UI comps to the callback', () => {
    jest.useFakeTimers();
    let cbMock = jest.fn();
    let sampleID = (new Entity()).id; // no UI_COMP here

    new GameLoop(cbMock, mapSize);
    jest.runOnlyPendingTimers();
    expect(cbMock.mock.calls[0][0][sampleID]).toBeUndefined();
    jest.runOnlyPendingTimers();
  });

  it('Build fighters only runs every 15 iterations', () => {
    jest.useFakeTimers();
    let cbMock = jest.fn();
    new GameLoop(cbMock, mapSize);
    let int = 0;
    while (int < FIGHTER_BUILD_RATE) {
      jest.runOnlyPendingTimers();
      int++;
    }
    //
    let fighters = 0;
    let hasFighters = 0;
    entityLoop(Entity.entities, (ent) => {
      if (ent[HAS_FIGHTERS] && notNeutral(ent)) {
        fighters += ent[HAS_FIGHTERS].fighters.length;
        hasFighters++;
      }
    });
    expect(fighters).toBe(hasFighters);
  });

  it('generates a map with a correct number of planets', () => {
    generateMap(mapSize);
    planets = getEntityOfType(EarthLike);
    expect(planets.length).toBe(mapSize[PLANETS_IN_MAP]);
  });
});