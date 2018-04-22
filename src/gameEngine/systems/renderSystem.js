import {
  POSITION,
  COLORS,
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  UI_COMP,
  PLAYER_1,
  SELECT_WIDTH
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';
import {isSelected} from 'gameEngine/components/PlayerControlledComponent';
import {getSprite, getSpriteArgs} from 'gameEngine/components/Sprite';
import {getDefendingFighters} from 'gameEngine/components/HasFighters';

function renderSystem(systemArguments, mapAPI, miniMapAPI, selectedBox) {
  mapAPI.clear();
  miniMapAPI.clear();
  let entsToDraw = systemArguments.Entity.getByComps([UI_COMP]);

  /* istanbul ignore else  */
  if (mapAPI && miniMapAPI) {
    entsToDraw.forEach((entity) => {
      renderMap(entity, mapAPI);
      renderMiniMap(entity, miniMapAPI);
    });

    // more map shapes
    if (selectedBox) {
      mapAPI.addRect({
        id: 'selectedBox',
        x: selectedBox.start.x,
        y: selectedBox.start.y,
        width: selectedBox.width,
        height: selectedBox.height,
        strokeStyle: gameConfig[COLORS][PLAYER_1]
      });
    }

    // more minimap shapes
    miniMapAPI.addRect({
      id: 'currentMap',
      x: -mapAPI.getPan().panX,
      y: -mapAPI.getPan().panY,
      width: 960,
      height: 540,
      strokeStyle: 'green',
      lineWidth: 20
    });

    mapAPI.draw();
    miniMapAPI.draw();
  }
}

function renderMap(entity, canvasAPI) {
  let {x, y, radius, angle} = entity[POSITION];

  let color = null;
  let lineWidth = 1;
  if (entity.hasComponents(OWNER_COMPONENT)) {
    color = gameConfig[COLORS][entity[OWNER_COMPONENT].player];
  }

  if (isSelected(entity)) {
    lineWidth = gameConfig[SELECT_WIDTH];
  }

  canvasAPI.addCircle({
    id: entity.id,
    x,
    y,
    radius,
    strokeStyle: color,
    lineWidth
  });

  // draw the image, if the entity has one..
  // TODO - fighter images are incorrect!
  let [cropStartX, cropStartY, cropSizeX, cropSizeY] = getSpriteArgs(entity);
  let image = getSprite(entity);

  canvasAPI.addImage({
    id: `${entity.id}-image`,
    image,
    x: x - radius, y: y - radius,
    height: radius * 2, width: radius * 2,
    cropStartX, cropStartY, cropSizeX, cropSizeY,
    rotation: angle // in radians
  });

  entity.hasComponents(HAS_FIGHTERS, () => {
    if (getDefendingFighters(entity) > 0) {
      canvasAPI.write({
        id: `${entity.id}-fighterCount`,
        text: getDefendingFighters(entity),
        x: radius + x - radius / 4,
        y: radius + y - radius / 4,
        font: '18px serif',
        textBaseline: 'top',
        fillStyle: 'yellow'
      });
    }
  });
}

function renderMiniMap(entity, canvasAPI) {
  let {x, y, radius, angle} = entity[POSITION];

  let color;
  let lineWidth = 1;
  if (entity.hasComponents(OWNER_COMPONENT)) {
    color = gameConfig[COLORS][entity[OWNER_COMPONENT].player];
  }

  canvasAPI.addCircle({
    id: entity.id,
    x,
    y,
    radius,
    strokeStyle: color,
    lineWidth,
    fillColor : color
  });
}

export default renderSystem;