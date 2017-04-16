import EarthLike from './ecs/entities/planets/EarthLike';
import Entity from './ecs/Entity';

import userInputSystem from './ecs/systems/userInputSystem';
import popGrowthSystem from './ecs/systems/popGrowthSystem';
import incomeSystem from './ecs/systems/incomeSystem';
import summarySystem from './ecs/systems/summarySystem';
import {pushAction} from './ecs/systems/userInputSystem';
import AvailableResources from './ecs/entities/AvailableResources';

class Game{
  constructor(cbNotification){
    this.dispatchAction = this.dispatchAction.bind(this);
    //setup some planets
    new EarthLike('Braxis',15);
    new EarthLike('Hehe',5);
    new EarthLike('Earth',35);
    new EarthLike('New Mars',10);
    new AvailableResources();

    this.t = setInterval(()=>{
      //userinput runs all the time, any modification to "user input" modifies stuff
      userInputSystem(Entity.entities);
      popGrowthSystem(Entity.entities);
      incomeSystem(Entity.entities);
      summarySystem(Entity.entities);

      //how do we know what to update? what entities actually changed?
      //let's force "all entities changed" thing.

      let uiEnts={};
      for(let id in Entity.entities){
        let ent = Entity.entities[id];
        if(ent.components.ui){
          uiEnts[id] = ent;
        }
      }
      cbNotification(JSON.parse(JSON.stringify(uiEnts)));
    },16); //16 = 60fps
  }

  stopGame(){
    clearInterval(this.t);
  }

  /**
   * @param action {obj} - contains, {entityID}
   */
  dispatchAction(action){
    pushAction(action);
  }
}

export default Game;