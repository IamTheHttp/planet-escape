import Entity from 'gameEngine/Entity';
import PopulationComponent from 'gameEngine/components/PopulationComponent';
import IncomeComponent from 'gameEngine/components/IncomeComponent';
import UIComponent from 'gameEngine/components/UIComponent';
import PlanetSizeComponent from 'gameEngine/components/PlanetSizeComponent';
import BuildingsComponent from 'gameEngine/components/BuildingsComponent';
import PlanetBonusComponent from 'gameEngine/components/PlanetBonusComponent';
import PositionComponent from 'gameEngine/components/PositionComponent';
import PlayerControlledComponent from 'gameEngine/components/PlayerControlledComponent';
import OwnerComponent from 'gameEngine/components/OwnerComponent';
import HasFighters from 'gameEngine/components/HasFighters';

import Fighter from 'gameEngine/entities/Ships/Fighter';

import {
  NEUTRAL,
  HAS_FIGHTERS
} from 'gameEngine/constants';

class EarthLike {
  constructor(name, basePop, xPos = 50, yPos = 50, player = NEUTRAL) {
    let pop = basePop || (Math.random() * 10);
    let ent = new Entity(EarthLike);
    ent.addComponent(new PopulationComponent(pop));
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new UIComponent(['planets', 'canvas']));
    ent.addComponent(new PlanetSizeComponent(this.getRandomPlanetSize(80, 120)));
    ent.addComponent(new BuildingsComponent);
    ent.addComponent(new PlanetBonusComponent());
    ent.addComponent(new PositionComponent(xPos, yPos));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new OwnerComponent(player));
    ent.addComponent(new HasFighters());

    // not for neutral player...
    // if (player !== NEUTRAL) {
    //   new Fighter(ent);
    // }
    ent.name = name;
    return ent;
  }

  getRandomPlanetSize(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default EarthLike;