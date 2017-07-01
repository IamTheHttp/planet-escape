import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {notNeutral} from 'gameEngine/components/OwnerComponent';
import {
  OWNER_COMPONENT,
  HAS_FIGHTERS
} from 'gameEngine/constants';

function buildFighters() {
  let entities = Entity.getByComps([OWNER_COMPONENT,HAS_FIGHTERS]);

  entityLoop(entities,(ent) => {
    if (notNeutral(ent)) {
      new Fighter(ent);
    }
  });
}

export default buildFighters;