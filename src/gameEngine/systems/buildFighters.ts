import Entity from '../../lib/ECS/Entity';
import entityLoop from '../../lib/ECS/util/entityLoop';
import Fighter, {FighterEntity} from 'gameEngine/entities/Ships/Fighter';
import {notNeutral} from 'gameEngine/components/OwnerComponent';
import {
  OWNER_COMPONENT,
  HAS_FIGHTERS,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';
import EarthLike from "../entities/planets/EarthLike";
import {ISystemArguments} from "../../d.ts/interfaces";

function buildFighterLoop(ent: EarthLike) {
  if (notNeutral(ent)) {
    const fighter = new Fighter(ent);
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