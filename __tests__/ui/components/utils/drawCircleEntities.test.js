/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import {
  drawEntity,
  colorByPlayer
} from 'ui/components/CanvasMap/utils/drawCircleEntities.js';
import EarthLike from 'gameEngine/entities/planets/EarthLike';

import {
  NEUTRAL,
  PLAYER_1,
  POSITION,
  PLAYER_CONTROLLED
} from 'gameEngine/constants';
describe('Tests a component', () => {
  let getMock = () => {
    return {
      moveTo : jest.fn(),
      beginPath : jest.fn(),
      arc : jest.fn(),
      stroke : jest.fn(),
      fill : jest.fn(),
      closePath : jest.fn(),
      setLineDash : jest.fn(),
      drawImage : jest.fn()
    };
  };

  beforeEach(() => {
      // setup the test
  });

  it('draws the entity', () => {
    let XPOS = 100;
    let YPOS = 120;
    let entity = new EarthLike(XPOS, YPOS, NEUTRAL);
    let mockCtx = getMock();
    drawEntity(entity, mockCtx);
  });

  it('colors by player defaults', () => {
    let mockCtx = getMock();
    let XPOS = 100;
    let YPOS = 120;
    let entity = new EarthLike(XPOS, YPOS, NEUTRAL);
    colorByPlayer({}, mockCtx); // this should do nothing
    colorByPlayer(entity, mockCtx);
    let color = mockCtx.strokeStyle;
    entity = new EarthLike(XPOS, YPOS, PLAYER_1);
    colorByPlayer(entity, mockCtx);
    expect(mockCtx.strokeStyle).not.toBe(color);
    expect(mockCtx.arc.mock.calls.length).toBe(2);
  });
});