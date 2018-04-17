import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import logger from 'shared/logger';
import React from 'react';
import {render} from 'react-dom';
import GameLoop from 'gameEngine/GameLoop';
import Modal from 'ui/components/Modal/Modal';
import MainMenu from 'ui/components/MainMenu/MainMenu';
import './global.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {
  GAME_STATE,
  GAME_WON,
  GAME_LOST,
  MAP_SIZE,
  DIFFICULTY,
  NUM_PLAYERS
} from 'gameEngine/constants';
import gameConfig from 'gameEngine/config';
import CanvasMap from 'ui/components/CanvasMap/CanvasMap';

class App extends React.Component {
  constructor() {
    super();

    this.defGameEnt = {
      [GAME_STATE]: {
        status: null
      }
    };


    this.state = {
      selectedEntity: false,
      buildingOptions: {},
      gameEnt: this.defGameEnt,
      isMenuOpen: true,
      fps : 60
    };
    this.game = {};
    // this.getGameEndModal = this.getGameEndModal.bind(this);
    this.frameCount = 0;
  }

  startGame(mapSize, difficulty) {
    return new GameLoop(this.updateGameState.bind(this), mapSize, difficulty, gameConfig[NUM_PLAYERS]);
  }

  stopGame() {
    window.cancelAnimationFrame(this.state.gameEnt[GAME_STATE].frameID);
  }

  logFrame(msFrame) {
    /* istanbul ignore else  */

    if (this.frameCount % 15 === 0) {
      this.setState({
        fps: (60 / msFrame).toPrecision(3)
      });
      // logger.info(`Frame Duration ${msFrame.toPrecision(3)}`);
    }
  }

  updateGameState(gameEntities, msFrame) {
    this.logFrame(msFrame);
    this.frameCount++;
    let gameEnt = this.defGameEnt;
    let entsToDraw = [];

    // TODO we should be able to remove this silly loop
    // why can't do we just use getbyComp([GAME_STATE])
    for (let id in gameEntities) {
      let ent = gameEntities[id];

      if (ent.hasComponents(GAME_STATE)) {
        // console.log(ent);
        gameEnt = ent;
        continue;
      }

      entsToDraw.push(ent);
    }

    this.setState({gameEnt});

    /* istanbul ignore else  */
    if (this.canvasMap) {
      this.canvasMap.update(entsToDraw);
    }
  }

  getGameEndModal() {
    let popUp = null;
    if (this.state.gameEnt[GAME_STATE].status === GAME_WON) {
      this.stopGame();
      popUp = (<Modal
        text={'Game Won!'}
        onClick={() => {
          this.game = this.startGame(this.mapSize, this.difficulty);
        }}
      ></Modal>);
    } else if (this.state.gameEnt[GAME_STATE].status === GAME_LOST) {
      this.stopGame();
      popUp = (<Modal
        text={'Game Over!'}
        onClick={() => {
          this.game = this.startGame(this.mapSize, this.difficulty);
        }}
      ></Modal>);
    }
    return popUp;
  }

  getMainMenuModal() {
    return (<MainMenu
      onStart={(menuSelection) => {
        this.mapSize = gameConfig[MAP_SIZE][menuSelection.mapSize];
        this.difficulty = gameConfig[DIFFICULTY][menuSelection.difficulty];
        this.game = this.startGame(this.mapSize, this.difficulty);
        this.setState({
          isMenuOpen: false
        });
      }}
    ></MainMenu>);
  }

  render() {
    // TODO Create a loading screen after we click 'start' until the app is ready
    // TODO Move the fps color to a class, position absolute and such
    return (
      <div>
        <div style={{color : this.state.fps >= 60 ? 'green' : 'red'}}>
          FPS : {this.state.fps}
        </div>
        <div className="container-fluid app">
          <div className="row">
            {!this.state.isMenuOpen && <CanvasMap
              ref={(inst) => {
                this.canvasMap = inst;
              }}
              mapSize={this.mapSize}
              dispatch={this.game.dispatchAction}
            >
            </CanvasMap>}
          </div>
        </div>
        {this.getGameEndModal()}
        {this.state.isMenuOpen && this.getMainMenuModal()}
      </div>
    );
  }
}

export default App;

