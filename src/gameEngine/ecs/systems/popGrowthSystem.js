import {POPULATION_COMP,PLANETBONUS_COMP,FOOD_RESOURCE} from 'gameEngine/constants';

function popGrowthSystem(entities) {
  for (let entityID in entities) {
    let entity = entities[entityID];

    if (entity.components[POPULATION_COMP]) {
      let newPop = Math.max((+entity.components[POPULATION_COMP].value * 1.005),1);

      if (entity.components[PLANETBONUS_COMP]) {
        //  1M per food!, min 1.
        let maxPop = Math.max(entity[PLANETBONUS_COMP].mod[FOOD_RESOURCE] * 1,1);

        entity[POPULATION_COMP].maxPop = maxPop;

        newPop = Math.min(maxPop,newPop);
        entity[POPULATION_COMP].value = newPop;
      }
    }
  }
}

export default popGrowthSystem;