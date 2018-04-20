import Entity from 'gameEngine/Entity';
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

// Expensive loop
// TODO, remove loop, use cached values only from HAS_FIGHTERS
export function getDefendingFighters(entity) {
  return entity[HAS_FIGHTERS].defenders;
}

export function addFighter(ent, fighter) {
  fighter.planetID = ent.id;
  ent[HAS_FIGHTERS].defenders++;
  return ent[HAS_FIGHTERS].fighters.push(fighter);
}

export function destroyFighter(fighter) {
  let ownerPlanet = Entity.entities[fighter.planetID];
  // if fighter has an owner..
  if (ownerPlanet) {
    // if fighter was defending, remove it from defender count
    if (fighter.hasComponents([DEFENDING])) {
      ownerPlanet[HAS_FIGHTERS].defenders--;
    }
    detachFighterFromPlanet(fighter);
  }
  fighter.destroy();
}

export function detachFighterFromPlanet(fighter) {
  let currentFighters = Object.assign([], getFighters(Entity.entities[fighter.planetID]));
  currentFighters.splice(currentFighters.indexOf(fighter), 1);
  Entity.entities[fighter.planetID][HAS_FIGHTERS].fighters = currentFighters;
  delete fighter.planetID;
}