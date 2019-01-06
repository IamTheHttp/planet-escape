// REFACTOR to just "fighters" component
import Entity from '../../lib/ECS/Entity';
import {
  HAS_FIGHTERS,
  DEFENDING
} from 'gameEngine/constants';
class HasFighters {
  constructor() {
    this.name = HAS_FIGHTERS;
    this.fighters = [];
    this.defenders = 0;
  }
}
export default HasFighters;


export function getFighters(ent) {
  return ent[HAS_FIGHTERS].fighters;
}

export function stopDefending(fighter) {
  Entity.entities[fighter.planetID][HAS_FIGHTERS].defenders--;
  fighter.removeComponent(DEFENDING);
}

export function getDefendingFighters(entity) {
  return entity[HAS_FIGHTERS].defenders;
}

export function detachFighterFromPlanet(fighter) {
  let currentFighters = getFighters(Entity.entities[fighter.planetID]).concat();
  currentFighters.splice(currentFighters.indexOf(fighter), 1);
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
export function addFighter(planet, fighter) {
  if (planet[HAS_FIGHTERS].fighters.indexOf(fighter) >= 0) {
    return null;
  }

  fighter.planetID = planet.id;
  planet[HAS_FIGHTERS].defenders++;
  return planet[HAS_FIGHTERS].fighters.push(fighter);
}

export function destroyFighter(fighter) {
  let ownerPlanet = Entity.entities[fighter.planetID];
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
export function reassignFighter(newPlanet, fighter) {
  let ownerPlanet = Entity.entities[fighter.planetID];
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