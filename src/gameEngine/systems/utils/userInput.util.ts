import {Entity, entityLoop} from "game-platform";

import {
  HAS_FIGHTERS,
  PLAYER_CONTROLLED,
  OWNER_COMPONENT,
  PLAYER_1,
  POSITION
} from 'gameEngine/constants';
import {getOwner} from 'gameEngine/components/OwnerComponent';
import {ISelectedBoxData} from "game-platform/dist/lib/interfaces";
import {BaseEntity} from "../../BaseEntity";

export function isPosInsideCircle(x: number, y: number, centerX: number, centerY: number, radius: number) {
  return Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(radius, 2);
}

export function getSelectedEntities() {
  let entity:BaseEntity;
  let entities = Entity.getByComps([PLAYER_CONTROLLED]);
  return entityLoop(entities, (ent:BaseEntity) => {
    // this assumes only one item can ever be selected.
    if (ent[PLAYER_CONTROLLED].selected) {
      entity = ent;
      return true;
    }
  });
}

export function setEntityDest(entity: BaseEntity, action: {x:number, y:number}) {
  entity[POSITION].destX = action.x;
  entity[POSITION].destY = action.y;
}

export function getEntitiesAtPos(x: number, y: number) {
  let entities = Entity.getByComps([POSITION]);
  return entityLoop(entities, (ent:BaseEntity) => {
    let centerX = ent[POSITION].x;
    let centerY = ent[POSITION].y;
    let radius = ent[POSITION].radius;
    if (isPosInsideCircle(x, y, centerX, centerY, radius)) {
      return true;
    }
  });
}

export function selectEntity({x, y}: {x:number, y: number}) {
  let entities = Entity.getByComps([POSITION, PLAYER_CONTROLLED, OWNER_COMPONENT]);
  entityLoop(entities, (ent:BaseEntity) => {
    let centerX = ent[POSITION].x;
    let centerY = ent[POSITION].y;
    let radius = ent[POSITION].radius;
    // this is what stops us from selecting an entity that does not belong to us
    let ownedByPlayer = getOwner(ent) === PLAYER_1;
    ent[PLAYER_CONTROLLED].selected = ownedByPlayer && isPosInsideCircle(x, y, centerX, centerY, radius);
  });
}

export function getEntitiesInSelectedBox(selectedBox: ISelectedBoxData) {
  let entities = Entity.getByComps([POSITION, HAS_FIGHTERS, OWNER_COMPONENT, PLAYER_CONTROLLED]);
  // entity's X/Y needs to be within the rectangle

  let minX = Math.min(selectedBox.start.x, selectedBox.end.x);
  let maxX = Math.max(selectedBox.start.x, selectedBox.end.x);
  let minY = Math.min(selectedBox.start.y, selectedBox.end.y);
  let maxY = Math.max(selectedBox.start.y, selectedBox.end.y);

  return entityLoop(entities, (ent: BaseEntity) => {
    let centerX = ent[POSITION].x;
    let centerY = ent[POSITION].y;

    let ownedByPlayer = getOwner(ent) === PLAYER_1;
    if (ownedByPlayer && centerX >= minX && centerX <= maxX && centerY >= minY && centerY <= maxY) {
      return true;
    }
  }) as BaseEntity[];
}

/**
 * Unselects all entities, returns an array of affected entities
 * @returns {Array}
 */
export function unSelectAllEntities() {
  let entities = Entity.getByComps([PLAYER_CONTROLLED]);

  return entityLoop(entities, (ent:BaseEntity) => {
    if (ent[PLAYER_CONTROLLED].selected) {
      ent[PLAYER_CONTROLLED].selected = false;
      return true;
    }
  });
}

/**
 * Unselects all entities, returns an array of affected entities
 * @returns {Null}
 */
export function selectAllEntities(playerKey: string) {
  let entities = Entity.getByComps([PLAYER_CONTROLLED, OWNER_COMPONENT]);
  entityLoop(entities, (ent:BaseEntity) => {
    if (getOwner(ent) === playerKey) {
      ent[PLAYER_CONTROLLED].selected = true;
    }
  });
}

export function selectEntitiesInSelectedBox(selectedBox: ISelectedBoxData) {
  let entities = getEntitiesInSelectedBox(selectedBox);
  entities.forEach((ent) => {
    ent[PLAYER_CONTROLLED].selected = true;
  });

  // this means that it was just a click, without any rect area
  if (selectedBox.end.x === selectedBox.start.x) {
    selectEntity(selectedBox.start);
  }
}
