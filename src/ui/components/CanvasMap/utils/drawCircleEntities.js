import {
  POSITION_COMP,
  PLAYERCONTROLLED_COMP,
  CAN_COLONIZE_COMP,
  COLORS,
  COLONIZE_RANGE,
  PLAYER_0,
  SELECT,
  DEFAULT,
  CANVAS,
  CIRCLE,
  OWNER_COMPONENT,
  MOVABLE
} from 'gameEngine/constants';

export function drawEntity(entity,ctx) {
  let {x,y,radius} = entity[POSITION_COMP];
  let isSelected = entity[PLAYERCONTROLLED_COMP].selected;

  ctx.moveTo(x,y);
  ctx.beginPath();
  if (isSelected) {
    ctx.strokeStyle = COLORS[SELECT];
  } else {
    ctx.strokeStyle = COLORS[DEFAULT];
  }
  ctx.arc(x,y,radius,0,Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

export function colorByPlayer(entity,ctx) {
  if (entity[OWNER_COMPONENT]) {
    let player = entity[OWNER_COMPONENT].player;
    ctx.fillStyle = COLORS[player];
    ctx.fill();
  }
}

export function colorActionRange(entity,ctx) {
  let {x,y,radius} = entity[POSITION_COMP];
  let isSelected = entity[PLAYERCONTROLLED_COMP].selected;
  if (isSelected && entity[CAN_COLONIZE_COMP]) {
    ctx.moveTo(x,y);
    ctx.beginPath();
    ctx.setLineDash([10, 15]);

    // this radius is 20 long, we need 100 distance between the two centers, so..
    ctx.strokeStyle = COLORS[COLONIZE_RANGE];
    ctx.arc(x,y,entity[CAN_COLONIZE_COMP].distance - radius,0,Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]);
  }
}

export default (ctx) => {
  return (entity) => {
    drawEntity(entity,ctx);
    colorByPlayer(entity,ctx);
    colorActionRange(entity,ctx);
  };
};