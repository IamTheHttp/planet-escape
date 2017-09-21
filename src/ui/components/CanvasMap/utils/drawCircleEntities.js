import logger from 'shared/logger';
import {
  POSITION,
  PLAYER_CONTROLLED,
  CAN_COLONIZE_COMP,
  COLORS,
  COLONIZE_RANGE,
  COLONIZE_RANGE_FADED,
  NEUTRAL,
  SELECT,
  DEFAULT,
  CANVAS,
  CIRCLE,
  OWNER_COMPONENT
} from 'gameEngine/constants';

export function drawEntity(entity, ctx) {
  let {x, y, radius} = entity[POSITION];
  let isSelected = entity[PLAYER_CONTROLLED] && entity[PLAYER_CONTROLLED].selected;
  if (x === null || y === null) {
    return;
  }
  ctx.moveTo(x, y);
  ctx.beginPath();
  if (isSelected) {
    ctx.strokeStyle = COLORS[SELECT];
  } else {
    ctx.strokeStyle = COLORS[DEFAULT];
  }
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

export function colorByPlayer(entity, ctx) {
  if (entity[OWNER_COMPONENT]) {
    let player = entity[OWNER_COMPONENT].player;
    ctx.fillStyle = COLORS[player];
    ctx.fill();
  }
}

export function colorActionRange(entity, ctx) {
  let {x, y, radius} = entity[POSITION];
  // TODO - Clean up duplicate code
  let isSelected = entity[PLAYER_CONTROLLED] && entity[PLAYER_CONTROLLED].selected;
  if (isSelected && entity[CAN_COLONIZE_COMP]) {
    ctx.moveTo(x, y);
    ctx.beginPath();
    ctx.setLineDash([10, 15]);

    // this radius is 20 long, we need 100 distance between the two centers, so..
    ctx.strokeStyle = COLORS[COLONIZE_RANGE];
    ctx.arc(x, y, entity[CAN_COLONIZE_COMP].distance - radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]);
  } else if (entity[CAN_COLONIZE_COMP]) {
    ctx.moveTo(x, y);
    ctx.beginPath();
    ctx.setLineDash([10, 15]);

    // this radius is 20 long, we need 100 distance between the two centers, so..
    ctx.strokeStyle = COLORS[COLONIZE_RANGE_FADED];
    ctx.arc(x, y, entity[CAN_COLONIZE_COMP].distance - radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

export default (ctx) => {
  return (entity) => {
    let {x, y, radius} = entity[POSITION];
    if (x === null || y === null) {
      return;
    }
    drawEntity(entity, ctx);
    colorByPlayer(entity, ctx);
    colorActionRange(entity, ctx);
  };
};