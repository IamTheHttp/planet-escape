import Entity from '../../../lib/ECS/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import MoveComponent from 'gameEngine/components/MoveComponent';
import OwnerComponent, {getOwner} from 'gameEngine/components/OwnerComponent';
import {addFighter} from 'gameEngine/components/HasFighters';
import Defending from 'gameEngine/components/Defending';
import gameConfig from 'gameEngine/config';
import Sprite from 'gameEngine/components/Sprite';

import {
  CANVAS,
  CIRCLE,
  CAN_ATTACK_PLANETS,
  POSITION,
  FIGHTER_RADIUS,
  FIGHTER_SPEED,
  FIGHTER_IMAGE,
  OWNER_COMPONENT,
  IN_PLACE_TO_ATTACK, MOVING
} from 'gameEngine/constants.js';

import fighter from 'assets/fighter.png';
import EarthLike from "../planets/EarthLike";
import {BaseEntity} from "../../BaseEntity";
import Moving from "../../components/Moving";
import {ObjectPool} from "game-platform";
import {gameTracker} from "../../GameTracker";

let fighterPool: ObjectPool;
let fighterImage = new Image();
fighterImage.src = fighter;

function createFighterEntity(planet: EarthLike, createdDuringPlay = true) {
  // We take one from the pool but we reset some key parts in it
  // this is what actually creates the fighter
  let ent = fighterPool.acquire();

  createdDuringPlay && gameTracker.track('fightersBuilt');

  ent[OWNER_COMPONENT].player = getOwner(planet);
  ent[POSITION].x = planet[POSITION].x;
  ent[POSITION].y = planet[POSITION].y;

  addFighter(planet, ent);
  return ent;
}


export class FighterEntity extends BaseEntity {
  [MOVING]: Moving;
  constructor() {
    super();

    this.addComponent(new MoveComponent(gameConfig[FIGHTER_SPEED]));
    this.addComponent({name: CAN_ATTACK_PLANETS});
    this.addComponent(new Defending);

    this.addComponent(new Sprite([{
      name: FIGHTER_IMAGE // default
    }
    ]));


    this.addComponent(new OwnerComponent(null));
    this.addComponent(new PositionComponent(null, null, gameConfig[FIGHTER_RADIUS]));
  }

  remove() {
    gameTracker.track('fightersDestroyed');
    // Whats the bear minimum we need to do to clean up a fighter?
    // Reset owner
    this[OWNER_COMPONENT].player = null;
    // Reset position
    this[POSITION].x = null;
    this[POSITION].y = null;

    this.reset();
    fighterPool.release(this);
  };

  reset() {
    // Remove the 'in place to attack';
    this.removeComponent(IN_PLACE_TO_ATTACK);

    // reset the defending state
    this.addComponent(new Defending);
  };
}

// TODO I think I really need a fleet entity
export function setFighterAsFleet(fighter: FighterEntity, fleetCount: number) {
  if (!fighter) {
    return null;
  }

  let images = [];

  let deltaFormationSpan = 0.75;
  let deltaFormationDistance = 0;

  for (let i = 0; i < Math.min(fleetCount, 5); i++) {
    let spanMultiplier;

    if (i === 0) {
      spanMultiplier = 0;
    } else {
      // all the events
      if (i % 2 === 0) {
        spanMultiplier = 1;
      } else {
        spanMultiplier = -1;
        deltaFormationDistance += 1;
      }
    }

    let calcAngle = fighter[POSITION].angle - spanMultiplier * deltaFormationSpan;
    let distance = fighter[POSITION].radius * 2 * deltaFormationDistance;

    images.push({
      name: FIGHTER_IMAGE, // my additions
      pos: {
        x: -Math.cos(calcAngle) * distance,
        y: -Math.sin(calcAngle) * distance,
        heightRatio: 1,
        widthRatio: 1
      }
    });
  }

  fighter.addComponent(new Sprite(images)); // sprite args
}


// TODO
// Should we allow hooks for addComponent / removeComponent?
// That would allow us to add the required logic in one place, while we avoid
// using magic functions that are defined in various places.
// Using the Refactor statement above :
// We can hook into "stopDefending" and add the UI comp.
export function addFighterUiComp(fighter: FighterEntity): void {
  if (!fighter) {
    return; // do nothing
  }

  fighter.addComponent(new UIComponent({
    name: CANVAS,
    shape: CIRCLE
  }));
}

fighterPool = new ObjectPool(FighterEntity);

export {fighterPool};
export default Fighter;