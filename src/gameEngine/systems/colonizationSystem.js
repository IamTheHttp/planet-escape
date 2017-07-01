import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {
  OWNER_COMPONENT,
  POPULATION_COMP,
  BUILDINGS_COMP,
  BASE_POP,
  HAS_FIGHTERS
} from 'gameEngine/constants';
import Entity from 'gameEngine/Entity';
function colonizationSystem() {
  let entities = Entity.getByComps([OWNER_COMPONENT,BUILDINGS_COMP,POPULATION_COMP]);

  entityLoop(entities, (ent) => {
    if (ent[OWNER_COMPONENT].playerChangeTime === false) {
      return null;
    }
    ent[OWNER_COMPONENT].playerChangeTime = false;

    ent[BUILDINGS_COMP].built = [];
    ent[BUILDINGS_COMP].inProgress = [];
    ent[POPULATION_COMP].value = BASE_POP;
  });
}

export default colonizationSystem;