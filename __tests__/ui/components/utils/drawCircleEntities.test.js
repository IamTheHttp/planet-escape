/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import {
  drawEntity,
  colorByPlayer,
  colorActionRange
} from 'ui/components/CanvasMap/utils/drawCircleEntities.js';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import Mothership from 'gameEngine/ecs/entities/ships/Mothership';

import {
  PLAYER_0,
  PLAYER_1,
  CAN_COLONIZE_COMP,
  POSITION_COMP,
  PLAYERCONTROLLED_COMP
} from 'gameEngine/constants';
describe('Tests a component', function () {

  let getMock = () => {
    return {
      moveTo : jest.fn(),
      beginPath : jest.fn(),
      arc : jest.fn(),
      stroke : jest.fn(),
      fill : jest.fn(),
      closePath : jest.fn(),
      setLineDash : jest.fn()
    };
  };

  beforeEach(function () {
      //setup the test
  });

  it('draws the entity', function () {
    let XPOS = 100;
    let YPOS = 120;
    let entity = new EarthLike('bar',50,XPOS,YPOS,PLAYER_0);

    let RAD = entity[POSITION_COMP].radius;

    let mockCtx = getMock();
    drawEntity(entity, mockCtx);

    expect(mockCtx.moveTo.mock.calls[0][0]).toBe(XPOS);
    expect(mockCtx.moveTo.mock.calls[0][1]).toBe(YPOS);

    expect(mockCtx.beginPath.mock.calls.length).toBe(1);
    expect(mockCtx.strokeStyle).not.toBeUndefined();
    let firstColor = mockCtx.strokeStyle;

    expect(mockCtx.arc.mock.calls[0][0]).toBe(XPOS);
    expect(mockCtx.arc.mock.calls[0][1]).toBe(YPOS);
    expect(mockCtx.arc.mock.calls[0][2]).toBe(RAD);
    expect(mockCtx.arc.mock.calls[0][3]).toBe(0);
    expect(mockCtx.arc.mock.calls[0][4]).toBe(Math.PI * 2); // so it's a circle

    expect(mockCtx.stroke.mock.calls.length).toBe(1);
    expect(mockCtx.closePath.mock.calls.length).toBe(1);

    mockCtx = getMock();

    entity[PLAYERCONTROLLED_COMP].selected = true;
    drawEntity(entity, mockCtx);
    expect(mockCtx.strokeStyle).not.toBe(firstColor);
  });

  it('colors by player defaults', () => {
    let mockCtx = getMock();
    let XPOS = 100;
    let YPOS = 120;
    let entity = new EarthLike('bar',50,XPOS,YPOS,PLAYER_0);
    colorByPlayer({},mockCtx); // this should do nothing
    colorByPlayer(entity,mockCtx);
    let color = mockCtx.fillStyle;
    entity = new EarthLike('bar',50,XPOS,YPOS,PLAYER_1);
    colorByPlayer(entity,mockCtx);
    expect(mockCtx.fillStyle).not.toBe(color);
    expect(mockCtx.fill.mock.calls.length).toBe(2);
  });

  it('colors player actions', () => {
    let mockCtx = getMock();
    let XPOS = 100;
    let YPOS = 120;
    let entity = new Mothership(XPOS,YPOS,PLAYER_0);
    entity[PLAYERCONTROLLED_COMP].selected = true;
    let RAD = entity[POSITION_COMP].radius;
    let dist = entity[CAN_COLONIZE_COMP].distance;

    colorActionRange(entity,mockCtx);

    expect(mockCtx.moveTo.mock.calls[0][0]).toBe(XPOS);
    expect(mockCtx.moveTo.mock.calls[0][1]).toBe(YPOS);
    expect(mockCtx.beginPath.mock.calls.length).toBe(1);
    expect(mockCtx.setLineDash.mock.calls[0][0]).toEqual([10,15]);

    expect(mockCtx.arc.mock.calls[0][0]).toBe(XPOS);
    expect(mockCtx.arc.mock.calls[0][1]).toBe(YPOS);
    expect(mockCtx.arc.mock.calls[0][2]).toBe(dist - RAD);
    expect(mockCtx.arc.mock.calls[0][3]).toBe(0);
    expect(mockCtx.arc.mock.calls[0][4]).toBe(Math.PI * 2); // so it's a circle

    expect(mockCtx.setLineDash.mock.calls[1][0]).toEqual([]);
    expect(mockCtx.stroke.mock.calls.length).toBe(1);
    expect(mockCtx.closePath.mock.calls.length).toBe(1);
  });

  it('does nothing if nothing is selected', () => {
    let mockCtx = getMock();
    let XPOS = 100;
    let YPOS = 120;
    let entity = new Mothership(XPOS,YPOS,PLAYER_0);
    entity[PLAYERCONTROLLED_COMP].selected = false;
    let RAD = entity[POSITION_COMP].radius;
    let dist = entity[CAN_COLONIZE_COMP].distance;

    colorActionRange(entity,mockCtx);
    expect(mockCtx.moveTo.mock.calls.length).toBe(0);
  });
});