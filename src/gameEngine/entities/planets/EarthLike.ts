import Entity from '../../../lib/ECS/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import PlayerControlledComponent from 'gameEngine/components/PlayerControlledComponent';
import OwnerComponent from 'gameEngine/components/OwnerComponent';
import Attackable from 'gameEngine/components/Attackable';
import Sprite from 'gameEngine/components/Sprite';

import gameConfig from 'gameEngine/config';
import {
  NEUTRAL,
  PLANET_RADIUS,
  CANVAS,
  PLANETS,
  CIRCLE,
  FIGHTER_COUNT,
  SHIELD_IMAGE,
  POSITION
} from 'gameEngine/constants';
import {BaseEntity} from "../../BaseEntity";
import {HasFighters} from "../../components/HasFighters";

class EarthLike extends BaseEntity {
  constructor(xPos = 50, yPos = 50, player = NEUTRAL) {
    super();
    let ent = new BaseEntity(EarthLike);

    let planetRadius = gameConfig[PLANET_RADIUS];
    ent.addComponent(new PositionComponent(xPos, yPos, planetRadius));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new OwnerComponent(player));
    ent.addComponent(new HasFighters());
    ent.addComponent(new Attackable(true));

    ent.addComponent(new Sprite([
      {
        name: PLANETS
      },
      {
        name: SHIELD_IMAGE,
        pos: {
          x: planetRadius,
          y: planetRadius,
          heightRatio: 0.6,
          widthRatio: 0.6
        }
      }
    ]));

    // REFACTOR this should be an interface somewhere, i don't like free forming objects
    let shapes = [
      {
        name: CANVAS,
        shape: CIRCLE
      },
      {
        name: CANVAS,
        shape: FIGHTER_COUNT
      }
    ];

    ent.addComponent(new UIComponent(shapes));

    return ent;
  }
}

export default EarthLike;