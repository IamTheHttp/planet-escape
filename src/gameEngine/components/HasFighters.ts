// REFACTOR to just "fighters" component

import {
  HAS_FIGHTERS,
  DEFENDING
} from 'gameEngine/constants';
import {Entity} from "game-platform";
import {BaseEntity} from "../BaseEntity";
import EarthLike from "../entities/planets/EarthLike";
import {FighterEntity} from "../entities/Ships/Fighter";

export class HasFighters {
  public name: string;
  public fighters: FighterEntity[];
  public defenders: number;

  constructor() {
    this.name = HAS_FIGHTERS;
    this.fighters = [];
    this.defenders = 0;
  }
}


export function getFighters(ent: BaseEntity): FighterEntity[] {
  return ent[HAS_FIGHTERS].fighters;
}

export function stopDefending(fighter: FighterEntity) {
  // @ts-ignore TODO improve types
  Entity.entities[fighter.planetID][HAS_FIGHTERS].defenders--;
  fighter.removeComponent(DEFENDING);
}

export function getDefendingFighters(entity: BaseEntity) {
  return entity[HAS_FIGHTERS].defenders;
}

export function detachFighterFromPlanet(fighter: FighterEntity) {
  // @ts-ignore fix with a Generic Entity.
  let currentFighters = getFighters(Entity.entities[fighter.planetID]).concat();


  currentFighters.splice(currentFighters.indexOf(fighter), 1);
  // @ts-ignore fix with a Generic Entity.
  Entity.entities[fighter.planetID][HAS_FIGHTERS].fighters = currentFighters;
  delete fighter.planetID;
}

/**
 * Adds a fighter to planet
 * Can't add the same fighter twice though
 * @param planet
 * @param fighter
 * @return {*}
 */
export function addFighter(planet: EarthLike, fighter: FighterEntity) {
  if (planet[HAS_FIGHTERS].fighters.indexOf(fighter) >= 0) {
    return null;
  }

  fighter.planetID = planet.id;
  planet[HAS_FIGHTERS].defenders++;
  return planet[HAS_FIGHTERS].fighters.push(fighter);
}

export function destroyFighter(fighter: FighterEntity) {
  let ownerPlanet = Entity.entities[fighter.planetID] as EarthLike;
  // if fighter has an owner..
  if (ownerPlanet) {
    // if fighter was defending, remove it from defender count
    if (fighter.hasComponents(DEFENDING)) {
      ownerPlanet[HAS_FIGHTERS].defenders--;
    }
    detachFighterFromPlanet(fighter);
  }
  fighter.remove();
}

/**
 * Removes a fighter from its current planet, and assigns it to a new planet
 * @param newPlanet
 * @param fighter
 */
export function reassignFighter(newPlanet: EarthLike, fighter: FighterEntity) {
  let ownerPlanet = Entity.entities[fighter.planetID] as BaseEntity;
  // if fighter has an owner..
  if (ownerPlanet) {
    // if fighter was defending, remove it from defender count
    if (fighter.hasComponents(DEFENDING)) {
      ownerPlanet[HAS_FIGHTERS].defenders--;
    }
    detachFighterFromPlanet(fighter);
  }

  // Remove the 'in place to attack';
  fighter.reset();

  addFighter(newPlanet, fighter);
}