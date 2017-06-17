import {POPULATION_COMP,PLANETBONUS_COMP,FOOD_RESOURCE} from 'gameEngine/constants';
import entityLoop from 'gameEngine/ecs/systems/utils/entityLoop.js';
function growPop(entities) {
  entityLoop(entities,(entity) => {
    entity.hasComponents(POPULATION_COMP, () => {
      let newPop = Math.max((+entity.components[POPULATION_COMP].value * 1.005),1);
      entity.hasComponents(PLANETBONUS_COMP, () => {
        //  1M per food!, min 1.
        let maxPop = Math.max(entity[PLANETBONUS_COMP].mod[FOOD_RESOURCE] * 1,1);
        entity[POPULATION_COMP].maxPop = maxPop;
        newPop = Math.min(maxPop,newPop);
        entity[POPULATION_COMP].value = newPop;
      });
    });
  });
}

export default growPop;