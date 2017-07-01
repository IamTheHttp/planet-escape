import Entity from 'gameEngine/Entity';
import {
  CAN_COLONIZE_COMP,
  OWNER_COMPONENT,
  PLAYER_1,
  NEUTRAL
} from 'gameEngine/constants';

import {getOwner, setOwner} from 'gameEngine/components/OwnerComponent';
import {getColonizeDistance} from 'gameEngine/components/CanColonize';
import {calcDistance} from 'gameEngine/components/PositionComponent';

import {
  getSelectedEntity,
  getEntityAtPos
} from 'gameEngine/systems/utils/userInput.util';

function colonize(action) {
  let selectedEntity = getSelectedEntity();
  let targetEntity = getEntityAtPos(action.x,action.y);

  selectedEntity.hasComponents([CAN_COLONIZE_COMP,OWNER_COMPONENT], () => {
    targetEntity.hasComponents(OWNER_COMPONENT, () => {
      let dist = calcDistance(selectedEntity, targetEntity);

      let inRange = dist < getColonizeDistance(selectedEntity);
      if (inRange && getOwner(targetEntity) === NEUTRAL) {
        setOwner(targetEntity,PLAYER_1);
        targetEntity[OWNER_COMPONENT].playerChangeTime = +(new Date());
      }
    });
  });
}

export default colonize;