import Entity from 'gameEngine/Entity';
import UIComponent from 'gameEngine/components/UIComponent';
import ModsPlanetBonusComponent from 'gameEngine/components/ModsPlanetBonusComponent';
import CostsComponent from 'gameEngine/components/CostsComponent';
import {FARM_COMP,GOLD_RESOURCE,FOOD_RESOURCE} from 'gameEngine/constants';

class Farm {
  constructor(isBuildable = false) {
    let ent = new Entity(Farm);
    ent.name = FARM_COMP;

    if (isBuildable) {
      ent.addComponent(new UIComponent('buildingOptions'));
    }

    ent.addComponent(new ModsPlanetBonusComponent({
      [FOOD_RESOURCE]:{
        type:'flat',
        amount: 2
      }})
    );

    ent.addComponent(new CostsComponent({[GOLD_RESOURCE]:50}));
    return ent;
  }
}
new Farm(true);
export default Farm;