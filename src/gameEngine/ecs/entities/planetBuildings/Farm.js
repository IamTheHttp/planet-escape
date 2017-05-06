import Entity from 'gameEngine/ecs/Entity'
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import ModifiesPlanetBonusComponent from 'gameEngine/ecs/components/ModifiesPlanetBonusComponent';
import CostsComponent from 'gameEngine/ecs/components/CostsComponent';
import {FARM_COMP,GOLD_RESOURCE,FOOD_RESOURCE} from 'gameEngine/constants';

class Farm{
  constructor(isBuildable = false){
    let ent = new Entity(Farm);
    ent.name = FARM_COMP;

    if(isBuildable){
      ent.addComponent(new UIComponent('buildingOptions'));
    }

    ent.addComponent(new ModifiesPlanetBonusComponent({
      [FOOD_RESOURCE]:{
        'type':'flat',
        'amount': 2
      }
      })
    );

    ent.addComponent(new CostsComponent({[GOLD_RESOURCE]:50}));
    return ent;
  }
}
new Farm(true);
export default Farm;