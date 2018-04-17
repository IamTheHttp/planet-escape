import logger from 'shared/logger';
import {
  POSITION,
  COLORS,
  HAS_FIGHTERS,
  DEFENDING,
  NEUTRAL,
  OWNER_COMPONENT,
  SPRITE,
  PLAYER_1
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';
import {getSprite, getSpriteArgs} from 'gameEngine/components/Sprite';
import {getFighters} from 'gameEngine/components/HasFighters';
import {isSelected} from 'gameEngine/components/PlayerControlledComponent';
import {getOwner} from 'gameEngine/components/OwnerComponent';

function drawImage(
  ctx,
  image,
  x, y, // pos for x,y..
  height, width,
  cropStartX, cropStartY, cropSizeX, cropSizeY,
  rotation, // in radians
) {
  // TODO - This method is expensive in the loop!
  ctx.translate(x + width / 2, y + height / 2); // will rotate around new position
  ctx.rotate(rotation);

  ctx.drawImage(image,
    cropStartX, cropStartY, cropSizeX, cropSizeY,
    -width / 2, -height / 2,  // pos in canvas // at the top left of the canvas
    width, height); // size in canvas
}

export function drawEntity(entity, ctx) {
  let {x, y, radius, angle} = entity[POSITION];
  if (x === null || y === null) {
    return;
  }

  if (entity.hasComponents(SPRITE)) {
    let image = getSprite(entity);
    // let spriteArgs = [image, ...getSpriteArgs(entity), x - radius, y - radius, radius * 2, radius * 2];
    // causes segmentation fault on tests for some reason
    /* istanbul ignore else  */
    if (process.env.NODE_ENV !== 'test') {
      let [cropStart, cropEnd, cropWidth, cropHeight] = getSpriteArgs(entity);
      drawImage(
        ctx,
        image,
        x - radius, y - radius,
        radius * 2, radius * 2,
        cropStart, cropEnd, cropWidth, cropHeight,
        angle + (90 * Math.PI / 180) // we add 90 degrees..
      );
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}

export function colorByPlayer(entity, ctx) {
  if (entity[OWNER_COMPONENT]) {
    let player = entity[OWNER_COMPONENT].player;
    let {x, y, radius} = entity[POSITION];
    ctx.moveTo(x, y);
    ctx.beginPath();
    ctx.lineWidth = 1;
    if (isSelected(entity)) {
      ctx.lineWidth = 3;
    }

    ctx.strokeStyle = gameConfig[COLORS][player];
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}

function writeFighterCount(entity, ctx) {
  // TODO - This method is expensive in the loop!
  entity.hasComponents(HAS_FIGHTERS, () => {
    let {x, y, radius} = entity[POSITION];
    let defendingFighters = getFighters(entity).filter((fighter) => {
      return fighter[DEFENDING];
    }).length;
    ctx.font = '18px serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'yellow';

    if (defendingFighters > 0) {
      ctx.fillText(defendingFighters, radius + x - radius / 4, radius + y - radius / 4);
    }
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
    (getOwner(entity) === PLAYER_1 || getOwner(entity) === NEUTRAL) && writeFighterCount(entity, ctx);
  };
};


