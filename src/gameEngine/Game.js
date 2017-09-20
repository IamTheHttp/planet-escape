import EarthLike from './entities/planets/EarthLike';
import Entity from './Entity';

import userInputSystem, {pushAction} from './systems/userInputSystem';
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
  PLAYER_3,
  CANVAS_X,
  CANVAS_Y,
  IS_DOCKED,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';

import {
  getGridBlockFromPos,
  createGrid,
  entityPlacer
} from 'placementUtil';

export function generateMap(planetCount) {
  let planetsToGenerate = planetCount >= 0 ? planetCount : 30;
  new Player(PLAYER_1);
  // 1200 x 1200 .. min distance is 45, heigt
  let count = 0;
  let planets = {};
  while (count < planetsToGenerate) {
    let player = count % 2 === 0 ? PLAYER_1 : PLAYER_2;
    let planet = new EarthLike('Braxis', 1, null, null, player);
    planets[planet.id] = planet;
    count++;
  }

  let area = {
    topLeftAreaX : 0,
    topLeftAreaY : 0,
    bottomRightAreaX: 1200,
    bottomRightAreaY : 1200
  };
  let motherShip = new Mothership(null, null, PLAYER_1);
  planets[motherShip.id] = motherShip;
  entityPlacer(planets, area);
}

class Game {
  constructor(cbNotification, planets = 30) {
    this.dispatchAction = this.dispatchAction.bind(this);
    // setup some planets
    generateMap(planets);
    let count = 0;

    let loop = () => {
      // userinput runs all the time, any modification to "user input" modifies stuff

      let start = performance.now();
      userInputSystem();
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