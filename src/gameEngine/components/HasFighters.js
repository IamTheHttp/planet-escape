import Entity from 'gameEngine/Entity';
import {
  HAS_FIGHTERS,
  IS_DOCKED
} from 'gameEngine/constants';
class HasFighters {
  constructor() {
    this.name = HAS_FIGHTERS;
    this.fighters = [];
  }
}
export default HasFighters;


export function getFighters(ent) {
  return ent[HAS_FIGHTERS].fighters;
}

export function getDockedFighters(entity) {
  return getFighters(entity).filter((fighter) => {
    return fighter[IS_DOCKED].isDocked;
  });
}

export function addFighter(ent, fighter) {
  fighter.planetID = ent.id;
  return ent[HAS_FIGHTERS].fighters.push(fighter);
}

export function detachFighterFromPlanet(fighter) {
  let currentFighters = Object.assign([], getFighters(Entity.entities[fighter.planetID]));
  currentFighters.splice(currentFighters.indexOf(fighter), 1);
  Entity.entities[fighter.planetID][HAS_FIGHTERS].fighters = currentFighters;
  delete fighter.planetID;
}

export function destroyFighter(fighter) {
  let ownerPlanet = Entity.entities[fighter.planetID];
  // if fighter has an owner..
  if (ownerPlanet) {
    detachFighterFromPlanet(fighter);
  }
  fighter.destroy();
}



// when we attack, we reset the array of the fighters.. great right?
// when we reach our target, we splice the index from the new built fighters instead of the old ones
