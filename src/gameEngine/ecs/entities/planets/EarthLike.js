import Entity from 'gameEngine/ecs/Entity';
import PopulationComponent from 'gameEngine/ecs/components/PopulationComponent';
import IncomeComponent from 'gameEngine/ecs/components/IncomeComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import PlanetSizeComponent from 'gameEngine/ecs/components/PlanetSizeComponent';
import BuildingsComponent from 'gameEngine/ecs/components/BuildingsComponent';
import PlanetBonusComponent from 'gameEngine/ecs/components/PlanetBonusComponent';
import PositionComponent from 'gameEngine/ecs/components/PositionComponent';
import PlayerControlledComponent from 'gameEngine/ecs/components/PlayerControlledComponent';
import OwnerComponent from 'gameEngine/ecs/components/OwnerComponent';

import {
  PLAYER_0
} from 'gameEngine/constants';

class EarthLike {
  constructor(name,basePop,xPos = 50,yPos = 50,player = PLAYER_0) {
    let pop = basePop || (Math.random() * 10);
    let ent = new Entity();
    ent.addComponent(new PopulationComponent(pop));
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new UIComponent(['planets','canvas']));
    ent.addComponent(new PlanetSizeComponent(this.getRandomPlanetSize(80,120)));
    ent.addComponent(new BuildingsComponent);
    ent.addComponent(new PlanetBonusComponent());
    ent.addComponent(new PositionComponent(xPos,yPos));
    ent.addComponent(new PlayerControlledComponent());
    ent.addComponent(new OwnerComponent(player));
    ent.name = name;
    return ent;
  }

  getRandomPlanetSize(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default EarthLike;