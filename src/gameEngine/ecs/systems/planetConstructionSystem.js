import {TREASURY_COMP,BUILDINGS_COMP,COSTS_COMP} from 'gameEngine/constants';

let treasuryEntity;

export function canAfford(treasuryEntity,costsComponent,spend = false){
  if(!costsComponent){
    return true;
  }

  let costs = costsComponent.items;

  for(let costName in costs){
    let costValue = costs[costName];
    if(treasuryEntity.components[costName].value > costValue){
      spend && (treasuryEntity.components[costName].value -= costValue);
    }
    else{
      return false;
    }
  }
  return true;
}

export function buildQueue(inProgress,built){
  for (let i = inProgress.length - 1; i >= 0; i -= 1) {

    let buildingEntity = inProgress[i];
    let canAff = canAfford(treasuryEntity,buildingEntity.components[COSTS_COMP]);
    if(canAff){
      canAfford(treasuryEntity,buildingEntity.components[COSTS_COMP],true);
      inProgress.splice(i, 1);
      built.push(buildingEntity);
    }
    else{
      inProgress.splice(i, 1);
    }
  }
}

function planetConstructionSystem(entities){

  for(let entityID in entities) {
    let entity = entities[entityID];
    if (entity.hasComponents([TREASURY_COMP])) {
      treasuryEntity = entity;
      break;
    }
  }

  for(let entityID in entities){
    let entity = entities[entityID];

    if(entity.hasComponents([BUILDINGS_COMP])){
      let inProgress = entity.components[BUILDINGS_COMP].inProgress;
      let built = entity.components[BUILDINGS_COMP].built;

      buildQueue(inProgress,built);

    }
  }
}

export default planetConstructionSystem;


