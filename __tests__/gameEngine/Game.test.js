/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Game, {generateMap} from 'gameEngine/Game';
import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop.js';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {
  HAS_FIGHTERS,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';


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
      // setup the test
  });

  it('should only pass UI comps to the callback', () => {
    jest.useFakeTimers();
    let cbMock = jest.fn();
    let sampleID = (new Entity()).id; // no UI_COMP here
    new Game(cbMock);
    jest.runOnlyPendingTimers();
    // expect(cbMock.mock.calls[0])
    expect(cbMock.mock.calls[0][0][sampleID]).toBeUndefined();
  });

  it('Build fighters only runs every 15 iterations', () => {
    jest.useFakeTimers();
    let cbMock = jest.fn();
    let sampleID = (new Entity()).id; // no UI_COMP here
    Entity.entities = {};
    new Game(cbMock);
    let int = 0;
    while (int < FIGHTER_BUILD_RATE) {
      jest.runOnlyPendingTimers();
      int++;
    }

    let fighters = 0;
    let hasFighters = 0;
    entityLoop(Entity.entities, (ent) => {
      if (ent[HAS_FIGHTERS]) {
        fighters += ent[HAS_FIGHTERS].fighters.length;
        hasFighters++;
      }
    });
    expect(fighters).toBe(hasFighters * 2);
  });


  it('generates a map with a correct number of planets', () => {
    Entity.entities = {};
    generateMap();
    planets = getEntityOfType(EarthLike);
    expect(planets.length).toBe(30);

    Entity.entities = {};
    generateMap(20);
    planets = getEntityOfType(EarthLike);
    expect(planets.length).toBe(20);

    Entity.entities = {};
    generateMap(20000);
    planets = getEntityOfType(EarthLike);
    expect(planets.length).toBe(36);

    Entity.entities = {};
    generateMap(-5);
    planets = getEntityOfType(EarthLike);
    // default is 30 if invalid argument is passed
    expect(planets.length).toBe(30);
  });
});