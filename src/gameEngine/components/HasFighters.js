import Entity from 'gameEngine/Entity';
import {
  HAS_FIGHTERS
} from 'gameEngine/constants';
class HasFighters {
  constructor() {
    this.name = HAS_FIGHTERS;
    this.fighters = [];
  }
}
export default HasFighters;


// TODO , add a cache mechanism for docked fighters
export function getFighters(ent) {
  return ent[HAS_FIGHTERS].fighters;
}

export function addFighter(ent, fighter) {
  return ent[HAS_FIGHTERS].fighters.push(fighter);
}

export function destroyFighter(fighter) {
  let ownerPlanet = Entity.entities[fighter.planetID];
  let fighters = getFighters(ownerPlanet);
  let idx = fighters.indexOf(fighter);
  fighters.splice(idx, 1);
  ownerPlanet[HAS_FIGHTERS].fighters = fighters;
  fighter.destroy();
  // delete Entity.entities[fighter.id];
}

// when we attack, we reset the array of the fighters.. great right?
// when we reach our target, we splice the index from the new built fighters instead of the old ones
