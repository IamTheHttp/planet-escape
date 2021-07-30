import {GameTracker} from "../gameEngine/GameTracker";
import {IDifficulty} from "../gameEngine/config";
import {IViewClickInfo} from "game-platform/dist/lib/interfaces";
import {BaseEntity} from "../gameEngine/BaseEntity";
import {Entity} from "game-platform";


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
  type: string;
  position: IPosData;
  fighters: number;
  player: string;
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

export interface IGridBlock {
  topLeftX: number;
  topLeftY: number;
  row: number;
  col: number;
  occupied: boolean;
}

export interface IPartialGrid extends Array<Array<IGridBlock>> {
  squareX?: number;
  squareY?: number;
  xLen?: number;
  yLen?: number;
}

export interface IGrid extends IPartialGrid {
  squareX: number;
  squareY: number;
  xLen: number;
  yLen: number;
}

export interface IArea {
  topLeftAreaX : number;
  topLeftAreaY : number;
  bottomRightAreaX: number;
  bottomRightAreaY : number;
}

export interface IViewSize {
  viewHeight: number
  viewWidth: number
  mapHeight: number
  mapWidth: number
}

export interface IPlayer {
  userName: string;
  levelsPassed: Record<string, number>
}

export interface IDispatchAction extends IViewClickInfo {
  name: string;
  entities: Record<string, BaseEntity>
}

export interface ISection {
  name?: string;
  shape?: string;
  data?: Record<string, unknown>
}

export interface IImageToRender {
  name: string;
  pos?: {
    x: number,
    y: number,
    heightRatio: number,
    widthRatio: number
  }
}