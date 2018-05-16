/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {
  PLAYER_1,
  MAIN_VIEW_SIZE_X,
  MAIN_VIEW_SIZE_Y
} from 'gameEngine/constants';
import Entity from 'lib/ECS/Entity';
import {mount, shallow} from 'enzyme';
import React from 'react';
import renderSystem from 'gameEngine/systems/renderSystem';
import EarthLike from 'gameEngine/entities/planets/EarthLike';

describe('Tests the render system', () => {
  let mapAPI;
  let miniMapAPI;
  let selectedBox;
  let viewSize = {
    heightSize : 2000,
    widthSize : 2000
  };

  beforeEach(() => {
    mapAPI = {
      clear: jest.fn(),
      addRect: jest.fn(),
      draw: jest.fn(),
      addCircle : jest.fn(),
      addImage : jest.fn(),
      getPan: () => {
        return {
          panX: 0,
          panY: 0
        };
      }
    };
    miniMapAPI = {
      clear: jest.fn(),
      addRect: jest.fn(),
      draw: jest.fn(),
      addCircle : jest.fn(),
      addImage : jest.fn(),
      getPan: () => {
        return {
          panX: 0,
          panY: 0
        };
      }
    };
    selectedBox = {
      width: 100,
      height: 100,
      start: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      }
    };
  });

  it('renderSystem, without selectedBox and no entities', () => {
    renderSystem({
      Entity,
      viewSize
    }, mapAPI, miniMapAPI, false);

    expect(mapAPI.addRect.mock.calls.length).toBe(0);
  });

  it('renderSystem, with selectedBox and no entities', () => {
    renderSystem({
      Entity,
      viewSize
    }, mapAPI, miniMapAPI, selectedBox);
    expect(mapAPI.addRect.mock.calls.length).toBe(1);
  });

  it('renderSystem, test minimap with no entities', () => {
    renderSystem({
      Entity,
      viewSize
    }, mapAPI, miniMapAPI, selectedBox);

    expect(miniMapAPI.addRect.mock.calls[0][0].id).toBe('currentMap');
  });

  it('renderSystemwith entities', () => {
    let ent = new EarthLike(200, 200, PLAYER_1);
    renderSystem({
      Entity,
      viewSize
    }, mapAPI, miniMapAPI, selectedBox);

    expect(miniMapAPI.addRect.mock.calls[0][0].id).toBe('currentMap');
    expect(miniMapAPI.addCircle.mock.calls[0][0].id).toBe(ent.id);
  });
});