
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
import Fighter from 'gameEngine/entities/Ships/Fighter';

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
      write: jest.fn(),
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
      write: jest.fn(),
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

  it('renderSystem with entities', () => {
    let ent = new EarthLike(200, 200, PLAYER_1);
    renderSystem({
      Entity,
      viewSize
    }, mapAPI, miniMapAPI, selectedBox);

    expect(miniMapAPI.addRect.mock.calls[0][0].id).toBe('currentMap');
    expect(miniMapAPI.addCircle.mock.calls[0][0].id).toBe(ent.id);
  });

  it('draws the fighter count in space', () => {
    let planet = new EarthLike(100, 200, PLAYER_1);

    new Fighter(planet);
    renderSystem({
      Entity,
      viewSize
    }, mapAPI, miniMapAPI, selectedBox);

    expect(mapAPI.write.mock.calls[0][0].text.indexOf(1)).toBeGreaterThan(-1);
  });

  it('Does not draw entities far outside of the map', () => {
    new EarthLike(-500, -500, PLAYER_1);
    renderSystem({
      Entity,
      viewSize
    }, mapAPI, miniMapAPI, selectedBox);

    expect(mapAPI.addCircle.mock.calls.length).toBe(2);
  });
});