import Entity from 'lib/ECS/Entity';
import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem from './systems/moveSystem';
import fighterAttacks from './systems/fighterAttacks';
import buildFighters from './systems/buildFighters';
import ai from './systems/ai';
import calcWinner from './systems/calcWinner';
import {generateMap} from 'shared/utils';
import CurrentGame from 'gameEngine/entities/CurrentGame';
import Fighter, {fighterPool} from 'gameEngine/entities/Ships/Fighter';
import {
  IN_PROGRESS,
  GAME_STATE
} from 'gameEngine/constants';

class GameLoop {
  constructor({notificationSystem, renderSystem, mapSize, difficulty, numPlayers}) {
    Entity.reset();
    fighterPool.generate(1000);

    // TODO, investigate object pool

    this.dispatchAction = this.dispatchAction.bind(this);
    // setup some planets
    generateMap(mapSize);
    let currentGame = new CurrentGame(IN_PROGRESS, numPlayers);

    let count = 0;
    let systemArguments = {
      mapSize,
      difficulty,
      numPlayers,
      count,
      Entity
    };
    this.currentGame = currentGame;


    this.loop = () => {
      // between initiations, it seems that the loop can run without
      // a game entity. this is should be checked first
      /* istanbul ignore else */
      if (currentGame[GAME_STATE]) {
        userInputSystem(systemArguments);
        ai(systemArguments);
        moveSystem(systemArguments);
        fighterAttacks(systemArguments);
        buildFighters(systemArguments);
        renderSystem(systemArguments);

        currentGame[GAME_STATE].status = calcWinner();
        currentGame[GAME_STATE].frameID = requestAnimationFrame(this.loop);

        // notifications last, as this is what stops the loop if it needs to stop
        notificationSystem(systemArguments);
        systemArguments.count++;
        count++;
      }
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