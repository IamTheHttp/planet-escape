import Entity from './Entity';
import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem from './systems/moveSystem';
import colonizationSystem from './systems/colonizationSystem';
import fighterAttacks from './systems/fighterAttacks';
import buildFighters from './systems/buildFighters';
import aiAttacks from './systems/aiAttacks';

import calcWinner from './systems/calcWinner';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {generateMap, oneOutOf} from 'shared/utils';
import Farm from 'gameEngine/entities/planetBuildings/Farm';
import Mine from 'gameEngine/entities/planetBuildings/Mine';
import Game from 'gameEngine/entities/Game';

import {
  UI_COMP,
  IS_DOCKED,
  IN_PROGRESS,
  GAME_STATE,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';

class GameLoop {
  constructor(cbNotification, planets = 30) {
    Entity.reset();
    this.dispatchAction = this.dispatchAction.bind(this);
    // setup some planets
    generateMap(planets, 4); // buffer
    let currentGame = new Game(IN_PROGRESS);
    let count = 0;

    let loop = () => {
      let start = performance.now();
      userInputSystem();
      // we skip this system, based on difficulty!
      // TODO - this is how we set difficulty?
      if (count % 120 === 0) {
        aiAttacks();
      }
      moveSystem();
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

      if (currentGame[GAME_STATE]) {
        currentGame[GAME_STATE].frameID = requestAnimationFrame(loop);
        currentGame[GAME_STATE].status = calcWinner();
      }

      uiEnts[currentGame.id] = currentGame;
      cbNotification(uiEnts, performance.now() - start);
      count++;
    };
    currentGame[GAME_STATE].frameID = requestAnimationFrame(loop);
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

export default GameLoop;