import logger from 'shared/logger';
import {
  POSITION,
  PLAYER_CONTROLLED,
  CAN_COLONIZE_COMP,
  COLORS,
  COLONIZE_RANGE,
  COLONIZE_RANGE_FADED,
  HAS_FIGHTERS,
  IS_DOCKED,
  NEUTRAL,
  SELECT,
  DEFAULT,
  CANVAS,
  CIRCLE,
  OWNER_COMPONENT,
  SPRITE
} from 'gameEngine/constants';
import {getSprite, getSpriteArgs} from 'gameEngine/components/Sprite';


import {getFighters} from 'gameEngine/components/HasFighters';
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

  if (entity.hasComponents(SPRITE)) {
    let image = getSprite(entity);
    let spriteArgs = [image, ...getSpriteArgs(entity), x - radius, y - radius, radius * 2, radius * 2];
    // causes segmentation fault on tests for some reason
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'test') {
      ctx.drawImage.apply(ctx, spriteArgs);
    }
  }
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

function writeFighteCount(entity, ctx) {
  entity.hasComponents(HAS_FIGHTERS, () => {
    let dockedFighters = getFighters(entity).filter((fighter) => {
      return fighter[IS_DOCKED].isDocked;
    }).length;
    let {x, y, radius} = entity[POSITION];
    ctx.font = '18px serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';

    if (dockedFighters > 9) {
      x = x - 5;
    }
    if (dockedFighters > 99) {
      x = x - 5;
    }
    ctx.fillText(dockedFighters, x - radius / 4, y - radius / 2);
  });
}

export default (ctx) => {
  return (entity) => {
    let {x, y, radius} = entity[POSITION];
    if (x === null || y === null) {
      return;
    }
    drawEntity(entity, ctx);
    colorByPlayer(entity, ctx);
    writeFighteCount(entity, ctx);
    colorActionRange(entity, ctx);
  };
};