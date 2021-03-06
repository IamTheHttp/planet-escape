import {
  POSITION,
  COLORS,
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  UI_COMP,
  PLAYER_1,
  SELECT_WIDTH,
  CIRCLE,
  FIGHTER_COUNT,
  SPRITE,
  PLANETS,
  EXPLOSION
} from 'gameEngine/constants';
import imageBuffer from '../../assets/imageBuffer';
import {gameConfig} from 'gameEngine/config';
import {isSelected} from 'gameEngine/components/PlayerControlledComponent';
import {getDefendingFighters} from 'gameEngine/components/HasFighters';
import {BaseEntity} from "../BaseEntity";
import CanvasAPI from "game-platform/dist/lib/CanvasAPI/CanvasAPI";
import {ISystemArguments} from "../../interfaces/interfaces";
import {ISelectedBoxData} from "game-platform/dist/lib/interfaces";


function renderMap(entity: BaseEntity, canvasAPI: CanvasAPI) {
  let {x, y, radius, angle} = entity[POSITION];
  let color:string = null;
  let lineWidth = 1;

  if (entity.hasComponents(OWNER_COMPONENT)) {
    color = gameConfig[COLORS][entity[OWNER_COMPONENT].player];
  }

  if (isSelected(entity)) {
    lineWidth = gameConfig[SELECT_WIDTH];
  }

  let drawFighterCount = () => {
  };


  // TODO - Why are we only rendering on the canvas if we have a Sprite?
  if (entity.hasComponents(SPRITE)) {
    entity[UI_COMP].sections.forEach((section) => {
      if (section.shape === CIRCLE) {
        // This is the representation of the Entity on the canvas, against it all hits are calculated!
        // Without this, you can't detect a hit on click/tap
        canvasAPI.addCircle({
          id: entity.id.toString(),
          x,
          y,
          radius,
          color: 'rgba(0,0,0,0)', // TODO Looks like a bug in CanvasAPI!
          lineWidth
        });
      }

      if (section.shape === CIRCLE && isSelected(entity)) {
        canvasAPI.addCircle({
          id: entity.id.toString(),
          x,
          y,
          radius: isSelected(entity) ? radius + 3 : radius,
          // strokeStyle: color,
          lineWidth
        });
      }

      if (section.shape === CIRCLE && entity.hasComponents(EXPLOSION)) {
        canvasAPI.addCircle({
          id: entity.id.toString(),
          x,
          y,
          radius: radius + entity.EXPLOSION.times * 2,
          // strokeStyle: color,
          lineWidth
        });
        entity.EXPLOSION.times++;
        if (entity.EXPLOSION.times === 10) {
          entity.removeComponent(EXPLOSION);
        }
      }

      let padNum = (num: number) => {
        return num < 10 ? ` ${num}` : num;
      };

      if (section.shape === FIGHTER_COUNT && entity.hasComponents(HAS_FIGHTERS)) {
        if (getDefendingFighters(entity) > 0) {
          let fontSize = getDefendingFighters(entity) > 99 ? 12 : 18;
          // we need to draw it last, so we save it for a bit later.
          drawFighterCount = () => {
            canvasAPI.write({
              id: `${entity.id}-fighterCount`,
              text: padNum(getDefendingFighters(entity)).toString(),
              x: radius + x - radius / (radius / 10) - (radius / 10) * 3, // TODO - magic numbers?
              y: radius + y - radius / (radius / 10) - (radius / 10) * 5,
              font: `${fontSize}px serif`,
              textBaseline: 'top',
              fillStyle: 'black'
            });
          };
        }
      }
    });

    entity[SPRITE].images.forEach((imageToRender, i) => {
      // REFACTOR this is ugly, create a fn that gets all this from the entity.
      let data = imageBuffer[imageToRender.name][entity[OWNER_COMPONENT].player];
      if (!data) {
        return;
      }
      let [cropStartX, cropStartY, cropSizeX, cropSizeY] = data.spriteArgs;
      let image = data.img;

      // does image have a pos??

      let baseImageX = x - radius;
      let baseImageY = y - radius;
      let baseHeight = radius * 2;
      let baseWidth = radius * 2;

      if (imageToRender.pos) {
        baseImageX += imageToRender.pos.x;
        baseImageY += imageToRender.pos.y;
        baseHeight *= imageToRender.pos.heightRatio;
        baseWidth *= imageToRender.pos.widthRatio;
      }

      canvasAPI.addImage({
        id: `${entity.id}-${i}-image-${imageToRender.name}`,
        image,
        x: baseImageX, y: baseImageY,
        height: baseHeight, width: baseWidth,
        cropStartX, cropStartY, cropSizeX, cropSizeY,
        rotation: angle // in radians
      });
    });

    // this needs to be on top of the shield
    drawFighterCount();
  }
}

function renderMiniMap(entity: BaseEntity, canvasAPI: CanvasAPI) {
  let {x, y, radius, angle} = entity[POSITION];

  let color;
  let lineWidth = 1;
  if (entity.hasComponents(OWNER_COMPONENT)) {
    color = gameConfig[COLORS][entity[OWNER_COMPONENT].player];
  }

  canvasAPI.addCircle({
    id: entity.id. toString(),
    x,
    y,
    radius,
    // strokeStyle: color, TODO looks like a bug in CanvasAPI
    lineWidth,
    fillColor: color
  });
}

function renderSystem(systemArguments: ISystemArguments, mapAPI: CanvasAPI, miniMapAPI: CanvasAPI, selectedBox:ISelectedBoxData) {
  mapAPI.clear();
  miniMapAPI.clear();
  let entsToDraw = systemArguments.Entity.getByComps([UI_COMP]);

  /* istanbul ignore else  */
  if (mapAPI && miniMapAPI) {
    let {panX, panY} = mapAPI.getPan();
    let {viewWidth, viewHeight} = systemArguments.viewSize;

    let loopHandler = (entity: BaseEntity) => {
      let {x, y, radius} = entity[POSITION];
      let entWidth = radius * 2;
      let entHeight = radius * 2;

      let xOutOfBound = x + entWidth < -panX || x - entWidth > -panX + viewWidth;
      let yOutOfBound = y + entHeight < -panY || y - entHeight > -panY + viewHeight;

      // out of screen? do nothing
      if (xOutOfBound || yOutOfBound) {
        // do nothing
      } else {
        renderMap(entity, mapAPI);
      }
      renderMiniMap(entity, miniMapAPI);
    };

    entsToDraw.forEach(loopHandler);

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

export default renderSystem;