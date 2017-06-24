import Entity from 'gameEngine/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import ModsPlanetBonusComponent from 'gameEngine/components/ModsPlanetBonusComponent';
import ConsumptionComponent from 'gameEngine/components/ConsumptionComponent';

class Mine {
  constructor(isBuildable = false) {
    let ent = new Entity(Mine);
    ent.name = 'Mine';

    if (isBuildable) {
      ent.addComponent(new UIComponent('buildingOptions'));
    }

    ent.addComponent(new ModsPlanetBonusComponent());
    ent.addComponent(new ConsumptionComponent());
    return ent;
  }
}

new Mine(true);
export default Mine;