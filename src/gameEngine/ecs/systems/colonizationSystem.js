import entityLoop from 'gameEngine/ecs/systems/utils/entityLoop';
import {
  OWNER_COMPONENT,
  POPULATION_COMP,
  BUILDINGS_COMP,
  BASE_POP
} from 'gameEngine/constants';

function colonizationSystem(entities) {
  entityLoop(entities,(ent) => {
    ent.hasComponents(OWNER_COMPONENT,() => {
      if (ent[OWNER_COMPONENT].playerChangeTime === false) {
        return null;
      }
      ent[OWNER_COMPONENT].playerChangeTime = false;

      ent.hasComponents(BUILDINGS_COMP,() => {
        ent[BUILDINGS_COMP].built = [];
        ent[BUILDINGS_COMP].inProgress = [];
      });

      ent.hasComponents(POPULATION_COMP, () => {
        ent[POPULATION_COMP].value = BASE_POP;
      });
    });
  });
}

export default colonizationSystem;