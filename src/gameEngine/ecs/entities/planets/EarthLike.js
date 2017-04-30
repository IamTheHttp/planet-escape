import Entity from 'gameEngine/ecs/Entity'
import PopulationComponent from 'gameEngine/ecs/components/PopulationComponent';
import IncomeComponent from 'gameEngine/ecs/components/IncomeComponent';
import UIComponent from 'gameEngine/ecs/components/UIComponent';
import PlanetSizeComponent from 'gameEngine/ecs/components/PlanetSizeComponent';
import BuildingsComponent from 'gameEngine/ecs/components/BuildingsComponent';
import LocalBonusComponent from 'gameEngine/ecs/components/LocalBonusComponent';


class EarthLike{
  constructor(name,basePop){
    let pop = basePop || (Math.random()*10);
    let ent = new Entity();
    ent.addComponent(new PopulationComponent(pop));
    ent.addComponent(new IncomeComponent());
    ent.addComponent(new UIComponent('planets'));
    ent.addComponent(new PlanetSizeComponent(this.getRandomPlanetSize(80,120)));
    ent.addComponent(new BuildingsComponent);
    ent.addComponent(new LocalBonusComponent());
    ent.name = name;
    return ent;
  }

  getRandomPlanetSize(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}

export default EarthLike;