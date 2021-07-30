// Fighters destroyed
// Fighters created
// entities moved
// distances calculated
// Entities created
// Entities destroyed

import userInputSystem, {pushAction} from './systems/userInputSystem';
import moveSystem from './systems/moveSystem';
import fighterAttacks from './systems/fighterAttacks';
import buildFighters from './systems/buildFighters';
import ai from './systems/ai';
import calcWinner from './systems/calcWinner';
import {generateMap} from 'shared/utils';
import {
  IN_PROGRESS,
  GAME_STATE, CLICK
} from 'gameEngine/constants';
import {
  IDispatchAction,
  ILevelData,
  ISystemArguments,
  IViewSize
} from "../interfaces/interfaces";
import {IDifficulty} from "./config";
import {CurrentGame} from "./entities/CurrentGame";
import {gameTracker} from "./GameTracker";
import {Entity} from "game-platform";
import {fighterPool} from "./entities/Ships/Fighter";



interface IConstructor {
  notificationSystem: (systemArguments: ISystemArguments) => void,
  renderSystem: (systemArguments: ISystemArguments) => void,
  levelData: ILevelData,
  viewSize: IViewSize,
  difficulty: IDifficulty,
  numPlayers: number;
}


class GameLoop {
  public currentGame: CurrentGame;
  public loop?: () => void;
  constructor({notificationSystem, renderSystem, levelData, viewSize, difficulty, numPlayers}: IConstructor) {
    gameTracker.track('newGameStarted');
    Entity.reset();
    fighterPool.generate(10000); // for performance reasons

    generateMap(levelData);

    let currentGame = new CurrentGame(numPlayers);

    let count = 0;
    let systemArguments = {
      levelData,
      viewSize,
      difficulty,
      numPlayers,
      count,
      Entity,
      gameTracker
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

    this.dispatchAction = this.dispatchAction.bind(this);
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
  dispatchAction(action: Partial<IDispatchAction>) {
    gameTracker.track('actionDispatched');
    pushAction(action);
  }
}

export default GameLoop;