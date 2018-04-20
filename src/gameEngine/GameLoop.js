import Entity from './Entity';
import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem from './systems/moveSystem';
import fighterAttacks from './systems/fighterAttacks';
import buildFighters from './systems/buildFighters';
import ai from './systems/ai';

import calcWinner from './systems/calcWinner';
import entityLoop from 'gameEngine/systems/utils/entityLoop';
import {generateMap, oneOutOf} from 'shared/utils';
import Game from 'gameEngine/entities/Game';

import {
  UI_COMP,
  DEFENDING,
  IN_PROGRESS,
  GAME_STATE,
  FIGHTER_BUILD_RATE,
  AI_DECISION_RATE
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';

class GameLoop {
  constructor(cbNotification, mapSize, difficulty, numPlayers) {
    Entity.reset();
    this.dispatchAction = this.dispatchAction.bind(this);
    // setup some planets
    generateMap(mapSize);
    let currentGame = new Game(IN_PROGRESS, numPlayers);
    let count = 0;

    this.currentGame = currentGame;
    this.loop = () => {
      let start = performance.now();
      userInputSystem();
      // throttle the AI decision making
      if (count % difficulty[AI_DECISION_RATE] === 0) {
        ai(count);
      }
      moveSystem();
      fighterAttacks();

      if (count % gameConfig[FIGHTER_BUILD_RATE] === 0) {
        buildFighters();
      }

      if (currentGame[GAME_STATE]) {
        currentGame[GAME_STATE].frameID = requestAnimationFrame(this.loop);
        currentGame[GAME_STATE].status = calcWinner();
      }

      cbNotification(Entity, performance.now() - start);
      count++;
    };

    this.resume();
  }

  resume() {
    this.currentGame[GAME_STATE].frameID = requestAnimationFrame(this.loop);
  }

  stop() {
    cancelAnimationFrame(this.currentGame[GAME_STATE].frameID);
  }

  /**
   * @param action {obj} - contains, {entityID}
   */
  dispatchAction(action) {
    pushAction(action);
  }
}

export default GameLoop;