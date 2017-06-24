import Entity from 'gameEngine/Entity';
import PopulationComponent from 'gameEngine/components/PopulationComponent';
import IncomeComponent from 'gameEngine/components/IncomeComponent';
import UIComponent from 'gameEngine/components/UIComponent';
import TreasuryComponent from 'gameEngine/components/TreasuryComponent';

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