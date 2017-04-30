import Entity from 'gameEngine/ecs/Entity'
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import PlanetBonusComponent from 'gameEngine/ecs/components/PlanetBonusComponent';
import ConsumptionComponent from 'gameEngine/ecs/components/ConsumptionComponent';

class Mine{
  constructor(isBuildable = false){
    let ent = new Entity(Mine);
    ent.name = 'Mine';

    if(isBuildable){
      ent.addComponent(new UIComponent('buildingOptions'));
    }

    ent.addComponent(new PlanetBonusComponent());
    ent.addComponent(new ConsumptionComponent());
    return ent;
  }
}

new Mine(true);
export default Mine;