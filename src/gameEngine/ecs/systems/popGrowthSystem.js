import {POPULATION_COMP,PLANETSIZE_COMP} from 'gameEngine/constants';

function popGrowthSystem(entities){
  for(let entityID in entities){
    let entity = entities[entityID];

    if(entity.components[POPULATION_COMP]){
      let newPop = Math.max((+entity.components[POPULATION_COMP].value + 0.005),0);

      if(entity.components[PLANETSIZE_COMP]){
        //0.15M per planetSize.
        let maxPop = entity.components[PLANETSIZE_COMP].value*0.1;
        entity.components[POPULATION_COMP].maxPop = maxPop;

        newPop = Math.min(maxPop,newPop);
        entity.components[POPULATION_COMP].value = newPop;
      }
    }
  }
}

export default popGrowthSystem;