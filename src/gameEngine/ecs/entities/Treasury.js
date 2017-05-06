import Entity from 'gameEngine/ecs/Entity'
import PopulationComponent from 'gameEngine/ecs/components/PopulationComponent';
import IncomeComponent from 'gameEngine/ecs/components/IncomeComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import {TREASURY_COMP,GOLD_RESOURCE} from 'gameEngine/constants'

class AvailableResources{
  constructor(){
    let ent = new Entity();
    ent.addComponent(new PopulationComponent());
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new UIComponent('summary'));
    ent.addComponent({
      name:TREASURY_COMP,
      items : {[GOLD_RESOURCE]:0}
    });
    return ent;
  }
}

export default AvailableResources;