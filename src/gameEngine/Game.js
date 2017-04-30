import EarthLike from './ecs/entities/planets/EarthLike';
import Entity from './ecs/Entity';

import userInputSystem from './ecs/systems/userInputSystem';
import popGrowthSystem from './ecs/systems/popGrowthSystem';
import incomeSystem from './ecs/systems/incomeSystem';
import planetBonusesSystem from './ecs/systems/planetBonusesSystem';
import treasuryUpdateSystem from './ecs/systems/treasuryUpdateSystem';
import planetConstructionSystem from './ecs/systems/planetConstructionSystem';

import Farm from 'gameEngine/ecs/entities/planetBuildings/Farm';
import Mine from 'gameEngine/ecs/entities/planetBuildings/Mine';
import {pushAction} from './ecs/systems/userInputSystem';
import Treasury from './ecs/entities/Treasury';
import {UI_COMP} from 'gameEngine/constants';
class Game{
  constructor(cbNotification){
    this.dispatchAction = this.dispatchAction.bind(this);
    //setup some planets
    new EarthLike('Braxis',1);
    new EarthLike('Hehe',2);
    new EarthLike('Earth',3);
    new EarthLike('New Mars',1);
    new Treasury();


    this.t = setInterval(()=>{
      //userinput runs all the time, any modification to "user input" modifies stuff
      userInputSystem(Entity.entities);
      planetBonusesSystem(Entity.entities);
      popGrowthSystem(Entity.entities);
      incomeSystem(Entity.entities);
      treasuryUpdateSystem(Entity.entities);
      planetConstructionSystem(Entity.entities);


      //how do we know what to update? what entities actually changed?
      //let's force "all entities changed" thing.

      let uiEnts={};
      for(let id in Entity.entities){
        let ent = Entity.entities[id];
        if(ent.components[UI_COMP]){
          uiEnts[id] = ent;
        }
      }
      cbNotification(JSON.parse(JSON.stringify(uiEnts)));
    },16); //16 = 60fps
  }

  // stopGame(){
  //   clearInterval(this.t);
  // }

  /**
   * @param action {obj} - contains, {entityID}
   */
  dispatchAction(action){
    pushAction(action);
  }
}

export default Game;