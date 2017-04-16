import Entity from '../Entity'
import PopulationComponent from '../components/PopulationComponent';
import IncomeComponent from '../components/IncomeComponent';
import UIComponent from '../components/UIComponent';
class AvailableResources{
  constructor(){
    let ent = new Entity();
    ent.addComponent(new PopulationComponent());
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new UIComponent('summary'));
    ent.addComponent({name:'summary'});
    return ent;
  }
}

export default AvailableResources;