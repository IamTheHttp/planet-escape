import {
  PLAYER_1,
} from 'gameEngine/constants';
import renderSystem from 'gameEngine/systems/renderSystem';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {Entity} from "game-platform";
import {createFighterEntity} from "../../../src/gameEngine/entities/Ships/Fighter";
import CanvasAPI from "game-platform/dist/lib/CanvasAPI/CanvasAPI";
import {ISelectedBoxData} from "game-platform/dist/lib/interfaces";
import {IViewSize} from "../../../src/interfaces/interfaces";

describe('Tests the render system', () => {
  let mapAPI: Partial<CanvasAPI>;
  let miniMapAPI: Partial<CanvasAPI>;
  let selectedBox: ISelectedBoxData;
  let viewSize: IViewSize = {
    mapHeight: null,
    mapWidth:null,
    viewHeight: 2000,
    viewWidth: 2000,
  };

  beforeEach(() => {
    mapAPI = {
      write: jest.fn(),
      clear: jest.fn(),
      addRect: jest.fn(),
      draw: jest.fn(),
      addCircle: jest.fn(),
      addImage: jest.fn(),
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
      addCircle: jest.fn(),
      addImage: jest.fn(),
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
      viewSize,
      difficulty: null,
      gameTracker: null,
      numPlayers: null,
      levelData: null,
      count: null
    }, mapAPI as CanvasAPI, miniMapAPI as CanvasAPI, null);

    expect((mapAPI.addRect as jest.Mock).mock.calls.length).toBe(0);
  });

  it('renderSystem, with selectedBox and no entities', () => {
    renderSystem({
      Entity,
      viewSize,
      difficulty: null,
      gameTracker: null,
      numPlayers: null,
      levelData: null,
      count: null
    }, mapAPI as CanvasAPI, miniMapAPI as CanvasAPI, selectedBox);
    expect((mapAPI.addRect as jest.Mock).mock.calls.length).toBe(1);
  });

  it('renderSystem, test minimap with no entities', () => {
    renderSystem({
      Entity,
      viewSize,
      difficulty: null,
      gameTracker: null,
      numPlayers: null,
      levelData: null,
      count: null
    }, mapAPI as CanvasAPI, miniMapAPI as CanvasAPI, selectedBox);

    expect((miniMapAPI.addRect as jest.Mock).mock.calls[0][0].id).toBe('currentMap');
  });

  it('renderSystem with entities', () => {
    let ent = new EarthLike(200, 200, PLAYER_1);
    renderSystem({
      Entity,
      viewSize,
      difficulty: null,
      gameTracker: null,
      numPlayers: null,
      levelData: null,
      count: null
    }, mapAPI as CanvasAPI, miniMapAPI as CanvasAPI, selectedBox);

    expect((miniMapAPI.addRect as jest.Mock).mock.calls[0][0].id).toBe('currentMap');
    expect((miniMapAPI.addCircle as jest.Mock).mock.calls[0][0].id).toBe(ent.id.toString());
  });

  it('draws the fighter count in space', () => {
    let planet = new EarthLike(100, 200, PLAYER_1);

    createFighterEntity(planet);
    renderSystem({
      Entity,
      viewSize,
      difficulty: null,
      gameTracker: null,
      numPlayers: null,
      levelData: null,
      count: null
    }, mapAPI as CanvasAPI, miniMapAPI as CanvasAPI, selectedBox);

    expect((mapAPI.write as jest.Mock).mock.calls[0][0].text.indexOf(1)).toBeGreaterThan(-1);
  });

  it('Does not draw entities far outside of the map', () => {
    new EarthLike(-500, -500, PLAYER_1);
    renderSystem({
      Entity,
      viewSize,
      difficulty: null,
      gameTracker: null,
      numPlayers: null,
      levelData: null,
      count: null
    }, mapAPI as CanvasAPI, miniMapAPI as CanvasAPI, selectedBox);

    expect((mapAPI.addCircle as jest.Mock).mock.calls.length).toBe(2);
  });
});