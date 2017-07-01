import EarthLike from './entities/planets/EarthLike';
import Entity from './Entity';

import userInputSystem, {pushAction} from './systems/userInputSystem';
import growPop from './systems/growPop';
import incomeSystem from './systems/incomeSystem';
import planetBonusesSystem from './systems/planetBonusesSystem';
import treasuryUpdateSystem from './systems/treasuryUpdateSystem';
import planetConstructionSystem from './systems/planetConstructionSystem';
import moveSystem from './systems/moveSystem';
import colonizationSystem from './systems/colonizationSystem';
import fighterAttacks from './systems/fighterAttacks';
import buildFighters from './systems/buildFighters';
import entityLoop from 'gameEngine/systems/utils/entityLoop';

import Farm from 'gameEngine/entities/planetBuildings/Farm';
import Mine from 'gameEngine/entities/planetBuildings/Mine';
import Mothership from 'gameEngine/entities/Ships/Mothership';
import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import Player from './entities/Player';
import {
  UI_COMP,
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  CANVAS_X,
  CANVAS_Y,
  IS_DOCKED,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';

export function generateMap(planetCount = 30) {
  let planetsToGenerate = planetCount;
  if (planetsToGenerate <= 0) {
    planetsToGenerate = 30;
  }
  new Player(PLAYER_1);
  // 1200 x 1200 .. min distance is 45, heigt
  // trivial solution - divide map to of 50, put planet in each grid.
  let x = 30;
  let y = 30;
  let spacing = 200;
  let count = 0;
  while (count < planetsToGenerate) {
    if (x > CANVAS_X - 100) {
      y += spacing;
      x = 30;
    }

    if (y > CANVAS_Y - 100) {
      break;
    }

    let player = count % 2 === 0 ? PLAYER_1 : PLAYER_2;
    new EarthLike('Braxis', 1, x, y,player);
    x += spacing;
    count++;
  }

  new Mothership(300,300,PLAYER_1);
}

class Game {
  constructor(cbNotification,planets = 5) {
    this.dispatchAction = this.dispatchAction.bind(this);
    // setup some planets
    generateMap(planets);
    let count = 0;

    let loop = () => {
      // userinput runs all the time, any modification to "user input" modifies stuff

      let start = performance.now();
      userInputSystem();
      moveSystem();
      // planetBonusesSystem(Entity.entities);
      // growPop(Entity.entities);
      // incomeSystem(Entity.entities);
      // treasuryUpdateSystem(Entity.entities);
      // planetConstructionSystem(Entity.entities);
      colonizationSystem();
      fighterAttacks();
      if (count % FIGHTER_BUILD_RATE === 0) {
        buildFighters();
      }
      let uiEnts = {};


      entityLoop(Entity.entities, (entity) => {
        let isDocked = entity[IS_DOCKED] && entity[IS_DOCKED].isDocked;
        if (!isDocked && entity.hasComponents(UI_COMP)) {
          uiEnts[entity.id] = entity;
        }
      });
      cbNotification(uiEnts, performance.now() - start);
      count++;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
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