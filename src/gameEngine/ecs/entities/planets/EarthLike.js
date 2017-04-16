import Entity from '../../../ecs/Entity'
import PopulationComponent from '../../../ecs/components/PopulationComponent';
import IncomeComponent from '../../../ecs/components/IncomeComponent';
import UIComponent from '../../../ecs/components/UIComponent';
import PlanetSizeComponent from '../../../ecs/components/PlanetSizeComponent';
class EarthLike{
  constructor(name,basePop){
    let pop = basePop || (Math.random()*10);
    let ent = new Entity();
    ent.addComponent(new PopulationComponent(pop));
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new UIComponent('planets'));
    ent.addComponent(new PlanetSizeComponent(this.getRandomPlanetSize(80,120)));

    ent.name = name;
    return ent;
  }

  getRandomPlanetSize(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

export default EarthLike;