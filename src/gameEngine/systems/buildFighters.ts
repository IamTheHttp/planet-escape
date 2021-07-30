import {notNeutral} from 'gameEngine/components/OwnerComponent';
import {
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';
import {gameConfig} from 'gameEngine/config';
import EarthLike from "../entities/planets/EarthLike";
import {ISystemArguments} from "../../interfaces/interfaces";
import {Entity, entityLoop} from "game-platform";
import {createFighterEntity} from "../entities/Ships/Fighter";

function buildFighterLoop(ent: EarthLike) {
  if (notNeutral(ent)) {
    const fighter = createFighterEntity(ent);
  }
}

function buildFighters(systemArguments: ISystemArguments) {
  if (systemArguments.count % gameConfig[FIGHTER_BUILD_RATE] !== 0) {
    return;
  }
  let entities = Entity.getByComps([OWNER_COMPONENT, HAS_FIGHTERS]);

  entityLoop(entities, buildFighterLoop);
}

export default buildFighters;