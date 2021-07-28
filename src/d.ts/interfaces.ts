import Entity from "../lib/ECS/Entity";
import {GameTracker} from "../gameEngine/GameTracker";
import {IDifficulty} from "../gameEngine/config";

export interface ILevelData {
  planets: IPlanetData[];
  mapScale: number;
  buffer: number;
  planetsInMap: number;
  order: number;
  width: number;
  height: number;
  hints: string[];
  key?: string;
}

export interface IPlanetData {
  type: string
  posData: IPosData
  fighters: number
}

export interface IPosData {
  name: String;
  x: number,
  y: number,
  radius: number,
  angle: number,
  destY?: number,
  destX?: number
}

export interface ISystemArguments {
  levelData: ILevelData,
  viewSize: IViewSize,
  difficulty: IDifficulty,
  numPlayers: number,
  count: number,
  Entity: typeof Entity;
  gameTracker: GameTracker
}

interface IGridBlock {
  topLeftX: number;
  topLeftY: number;
  row: number;
  col: number;
  occupied: boolean;
}

export interface IGrid {
  squareX: number;
  squareY: number;
  xLen: number;
  yLen: number;
}

export interface IViewSize {
  viewHeight: number
  viewWidth: number
  mapHeight: number
  mapWidth: number
}