import Entity from 'gameEngine/ecs/Entity'
import PopulationComponent from 'gameEngine/ecs/components/PopulationComponent';
import IncomeComponent from 'gameEngine/ecs/components/IncomeComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import goldComponent from 'gameEngine/ecs/components/resources/goldComponent';
import {TREASURY_COMP} from 'gameEngine/constants'

class AvailableResources{
  constructor(){
    let ent = new Entity();
    ent.addComponent(new PopulationComponent());
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new goldComponent());
    ent.addComponent(new UIComponent('summary'));
    ent.addComponent({name:TREASURY_COMP});
    return ent;
  }
}

export default AvailableResources;