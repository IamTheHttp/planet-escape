import Entity from 'gameEngine/Entity';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {getFighters, destroyFighter} from 'gameEngine/components/HasFighters';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import {notNeutral} from 'gameEngine/components/OwnerComponent';
// import {hasDest, isSamePos, destReached} from 'gameEngine/components/PositionComponent';
import {
  OWNER_COMPONENT,
  CAN_ATTACK_PLANETS,
  POSITION,
  HAS_FIGHTERS,
  NEUTRAL
} from 'gameEngine/constants';

function buildFighters(entities) {
  entityLoop(entities,(ent) => {
    ent.hasComponents([OWNER_COMPONENT,HAS_FIGHTERS],() => {
      if (notNeutral(ent)) {
        new Fighter(ent);
      }
    });
  });
}

export default buildFighters;