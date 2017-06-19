/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Game, {generateMap} from 'gameEngine/Game';
import Entity from 'gameEngine/ecs/Entity';
describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('should only pass UI comps to the callback', function () {
    jest.useFakeTimers();
    let cbMock = jest.fn();
    let sampleID = (new Entity()).id; //no UI_COMP here
    new Game(cbMock);
    jest.runOnlyPendingTimers();
    //expect(cbMock.mock.calls[0])
    expect(cbMock.mock.calls[0][0][sampleID]).toBeUndefined();
  });

  it('generates a map with a correct number of planets', function () {
    Entity.entities = {};
    generateMap(20);
    // the map generates 20 planets + player + mothership === x + 2 always.
    expect(Object.keys(Entity.entities).length).toBe(22);
    // max is 36..

    Entity.entities = {};
    generateMap(20000);
    // max is 36 planets
    expect(Object.keys(Entity.entities).length).toBe(38);

    Entity.entities = {};
    generateMap(-5);
    // default is 30 if invalid argument is passed
    expect(Object.keys(Entity.entities).length).toBe(32);
  });
});