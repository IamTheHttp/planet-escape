import EarthLike from './ecs/entities/planets/EarthLike';
import Entity from './ecs/Entity';

import userInputSystem, {pushAction} from './ecs/systems/userInputSystem';
import growPop from './ecs/systems/growPop';
import incomeSystem from './ecs/systems/incomeSystem';
import planetBonusesSystem from './ecs/systems/planetBonusesSystem';
import treasuryUpdateSystem from './ecs/systems/treasuryUpdateSystem';
import planetConstructionSystem from './ecs/systems/planetConstructionSystem';
import moveSystem from './ecs/systems/moveSystem';
import colonizationSystem from './ecs/systems/colonizationSystem';

import Farm from 'gameEngine/ecs/entities/planetBuildings/Farm';
import Mine from 'gameEngine/ecs/entities/planetBuildings/Mine';
import Mothership from 'gameEngine/ecs/entities/ships/Mothership';
import Player from './ecs/entities/Player';
import {UI_COMP, PLAYER_1} from 'gameEngine/constants';
class Game {
  constructor(cbNotification) {
    this.dispatchAction = this.dispatchAction.bind(this);
    // setup some planets
    new Player(PLAYER_1);
    new EarthLike('Braxis',1,30,30,PLAYER_1);
    new EarthLike('Hehe',2,90,90);
    new EarthLike('Earth',3,150,100);
    new EarthLike('New Mars',1,60,250);
    new Mothership(300,300,PLAYER_1);

    this.loopID = setInterval(() => {
      // userinput runs all the time, any modification to "user input" modifies stuff
      userInputSystem(Entity.entities);
      moveSystem(Entity.entities);
      planetBonusesSystem(Entity.entities);
      growPop(Entity.entities);
      incomeSystem(Entity.entities);
      treasuryUpdateSystem(Entity.entities);
      planetConstructionSystem(Entity.entities);
      colonizationSystem(Entity.entities);

      // how do we know what to update? what entities actually changed?
      // let's force "all entities changed" thing.

      let uiEnts = {};
      for (let id in Entity.entities) {
        let ent = Entity.entities[id];
        if (ent.components[UI_COMP]) {
          uiEnts[id] = ent;
        }
      }
      cbNotification(JSON.parse(JSON.stringify(uiEnts)));
    },16); // 16 = 60fps
  }

  // stopGame() {
  //   clearInterval(this.loopID);
  // }

  /**
   * @param action {obj} - contains, {entityID}
   */
  dispatchAction(action) {
    pushAction(action);
  }
}

export default Game;