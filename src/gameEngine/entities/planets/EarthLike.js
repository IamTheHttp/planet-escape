import Entity from 'gameEngine/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import BuildingsComponent from 'gameEngine/components/BuildingsComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import PlayerControlledComponent from 'gameEngine/components/PlayerControlledComponent';
import OwnerComponent from 'gameEngine/components/OwnerComponent';
import HasFighters from 'gameEngine/components/HasFighters';
import Attackable from 'gameEngine/components/Attackable';
import Sprite from 'gameEngine/components/Sprite';

// TODO move to assets list or something..
import planets from 'assets/planets.png';
let planetsImage = new Image();
planetsImage.src = planets;

import Fighter from 'gameEngine/entities/Ships/Fighter';

import {
  NEUTRAL,
  HAS_FIGHTERS
} from 'gameEngine/constants';

class EarthLike {
  constructor(xPos = 50, yPos = 50, player = NEUTRAL) {
    let ent = new Entity(EarthLike);
    ent.addComponent(new UIComponent(['planets', 'canvas']));
    ent.addComponent(new BuildingsComponent);
    ent.addComponent(new PositionComponent(xPos, yPos, 15));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new OwnerComponent(player));
    ent.addComponent(new HasFighters());
    ent.addComponent(new Attackable(true));
    ent.addComponent(new Sprite(planetsImage, [510, 380, 300, 300])); // sprite args
    ent.name = name;
    return ent;
  }
}

export default EarthLike;