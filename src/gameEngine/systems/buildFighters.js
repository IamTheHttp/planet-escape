import Entity from '../../lib/ECS/Entity';
import entityLoop from '../../lib/ECS/util/entityLoop';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {notNeutral} from 'gameEngine/components/OwnerComponent';
import {
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';

function buildFighters(systemArguments) {
  if (systemArguments.count % gameConfig[FIGHTER_BUILD_RATE] !== 0) {
    return;
  }
  let entities = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS]);

  entityLoop(entities, (ent) => {
    if (notNeutral(ent)) {
      new Fighter(ent);
    }
  });
}

export default buildFighters;