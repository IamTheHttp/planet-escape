import UIComponent from 'gameEngine/components/UIComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import PlayerControlledComponent from 'gameEngine/components/PlayerControlledComponent';
import OwnerComponent from 'gameEngine/components/OwnerComponent';
import Attackable from 'gameEngine/components/Attackable';
import Sprite from 'gameEngine/components/Sprite';

import {gameConfig} from 'gameEngine/config';
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
import {ISection} from "../../../interfaces/interfaces";

class EarthLike extends BaseEntity {
  constructor(xPos = 50, yPos = 50, player = NEUTRAL) {
    super();
    // let ent = new BaseEntity(EarthLike);

    let planetRadius = gameConfig[PLANET_RADIUS];
    this.addComponent(new PositionComponent(xPos, yPos, planetRadius));
    this.addComponent(new PlayerControlledComponent());
    this.addComponent(new OwnerComponent(player));
    this.addComponent(new HasFighters());
    this.addComponent(new Attackable(true));

    this.addComponent(new Sprite([
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
    let shapes: ISection[] = [
      {
        name: CANVAS,
        shape: CIRCLE
      },
      {
        name: CANVAS,
        shape: FIGHTER_COUNT
      }
    ];

    this.addComponent(new UIComponent(shapes));
  }
}

export default EarthLike;