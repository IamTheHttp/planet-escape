import Entity from 'gameEngine/ecs/Entity';
import PopulationComponent from 'gameEngine/ecs/components/PopulationComponent';
import IncomeComponent from 'gameEngine/ecs/components/IncomeComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import TreasuryComponent from 'gameEngine/ecs/components/TreasuryComponent';

class Player {
  constructor() {
    let ent = new Entity();
    ent.addComponent(new PopulationComponent());
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new TreasuryComponent());
    // ent.addComponent(new UIComponent('summary'));
    return ent;
  }
}

export default Player;