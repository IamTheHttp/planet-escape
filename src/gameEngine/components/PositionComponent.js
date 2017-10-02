/** @namespace entity.components.localBonus */
import {POSITION} from 'gameEngine/constants';
class PositionComponent {
  constructor(x, y, radius = 20) {
    this.name = POSITION;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = 0;
  }
}

export default PositionComponent;

export function getPos(ent) {
  return {
    x:ent[POSITION].x,
    y:ent[POSITION].y
  };
}

export function getDest(ent) {
  return {
    x:ent[POSITION].destX,
    y:ent[POSITION].destY
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
    ent[POSITION].angle = (180 * Math.PI / 180) +  Math.atan(deltaY / deltaX);
  } else {
    ent[POSITION].angle = Math.atan(deltaY / deltaX);
  }
}

export function destReached(ent) {
  let xReached = getPos(ent).x === getDest(ent).x;
  let yReached = getPos(ent).y === getDest(ent).y;
  return xReached && yReached;
}

export function hasDest(ent) {
  // it's enough to check X only
  let x = getDest(ent).x;
  return typeof x === 'number';
}

export function isSamePos(ent1, ent2) {
  return getPos(ent1).x === getPos(ent2).x && getPos(ent1).y === getPos(ent2).y;
}

export function calcDistance(ent1, ent2) {
  let pos1 = getPos(ent1);
  let pos2 = getPos(ent2);
  let xDist = Math.pow(pos1.x - pos2.x, 2);
  let yDist = Math.pow(pos1.y - pos2.y, 2);
  let squaredDist = xDist + yDist;
  return Math.sqrt(squaredDist);
}