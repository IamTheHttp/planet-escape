/** @namespace entity.components.localBonus */
import {POSITION} from 'gameEngine/constants';
import {BaseEntity} from "../BaseEntity";

let memoize = require('memoizee');

class PositionComponent {
  public name: string;
  public x: number;
  public y: number;
  public radius: number;
  public angle: number;
  public destY: number;
  public destX: number;

  constructor(x: number, y: number, radius: number) {
    this.name = POSITION;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = 0;
    this.destY = null;
    this.destX = null;
  }
}

export default PositionComponent;

export function getPos(ent: BaseEntity) {
  return {
    x: ent[POSITION].x,
    y: ent[POSITION].y
  };
}

export function getDest(ent: BaseEntity) {
  return {
    x: ent[POSITION].destX,
    y: ent[POSITION].destY
  };
}

export function setDest(ent, target) {
  ent[POSITION].destX = target[POSITION].x;
  ent[POSITION].destY = target[POSITION].y;

  // Set movement angle
  let deltaY = ent[POSITION].destY - ent[POSITION].y;
  let deltaX = ent[POSITION].destX - ent[POSITION].x;

  // if we go backwards, rotate half a circle
  if (deltaX < 0) {
    ent[POSITION].angle = (180 * Math.PI / 180) + Math.atan(deltaY / deltaX);
  } else {
    ent[POSITION].angle = Math.atan(deltaY / deltaX);
  }
}

export function destReached(ent:BaseEntity) {
  let xReached = getPos(ent:BaseEntity).x === getDest(ent:BaseEntity).x;
  let yReached = getPos(ent:BaseEntity).y === getDest(ent:BaseEntity).y;
  return xReached && yReached;
}

export function hasDest(ent:BaseEntity) {
  // it's enough to check X only
  let x = getDest(ent:BaseEntity).x;
  return typeof x === 'number';
}

export function isSamePos(ent1, ent2) {
  return getPos(ent1).x === getPos(ent2).x && getPos(ent1).y === getPos(ent2).y;
}

let calcDistance = memoize((ent1, ent2) => {
  let pos1 = getPos(ent1);
  let pos2 = getPos(ent2);
  let xDist = Math.pow(pos1.x - pos2.x, 2);
  let yDist = Math.pow(pos1.y - pos2.y, 2);
  let squaredDist = xDist + yDist;
  return Math.sqrt(squaredDist);
});

export {calcDistance};