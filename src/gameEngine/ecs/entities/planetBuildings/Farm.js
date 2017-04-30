import Entity from 'gameEngine/ecs/Entity'
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import PlanetBonusComponent from 'gameEngine/ecs/components/PlanetBonusComponent';
import CostsComponent from 'gameEngine/ecs/components/CostsComponent';
import {FARM_COMP,GOLD_COMP,FOOD_COMP} from 'gameEngine/constants';

class Farm{
  constructor(isBuildable = false){
    let ent = new Entity(Farm);
    ent.name = FARM_COMP;

    if(isBuildable){
      ent.addComponent(new UIComponent('buildingOptions'));
    }

    ent.addComponent(new PlanetBonusComponent({
      [FOOD_COMP]:{
        'type':'flat',
        'amount': 2
      }
      })
    );

    ent.addComponent(new CostsComponent({[GOLD_COMP]:50}));
    return ent;
  }
}
new Farm(true);
export default Farm;