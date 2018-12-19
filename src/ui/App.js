import {
  GAME_STATE,
  GAME_WON,
  GAME_LOST,
  MAP_SIZE,
  DIFFICULTY,
  NUM_PLAYERS,
  CANVAS_X,
  CANVAS_Y,
  CLICK,
  MAIN_VIEW_SIZE_X,
  MAIN_VIEW_SIZE_Y,
  LARGE,
  STRESS_TEST,
  FIGHTER_BUILD_RATE,
  PLANETS_IN_MAP
} from 'gameEngine/constants';
import React from 'react';
import './global.scss';
import GameLoop from 'gameEngine/Game';
import Modal from 'ui/components/Modal/Modal';
import MainMenu from 'ui/components/MainMenu/MainMenu';
import gameConfig from 'gameEngine/config';
import MainMenuBtn from 'ui/components/MainMenuBtn/MainMenuBtn';
import Minimap from 'ui/components/Minimap/Minimap';
import MainView from 'ui/components/MainView/MainView';
import renderSystem from 'gameEngine/systems/renderSystem';
import GameCanvas from 'lib/GameCanvas/GameCanvas';
import i18n from 'ui/i18n';
import levels from 'levels/levels.json';

class App extends React.Component {
  constructor() {
    super();
    this.game = {};
    this.state = {
      gameCount: 0,
      isMenuOpen: true,
      gamePaused: false,
      gameEnded: true,
      gameWon: null // null means the game was not yet decided
    };
    this.updateGameState = this.updateGameState.bind(this);
    this.renderOnCanvas = this.renderOnCanvas.bind(this);
    this.startGame = this.startGame.bind(this);

    window.stressTest = () => {
      gameConfig[FIGHTER_BUILD_RATE] = 10;
      this.startGame(gameConfig[MAP_SIZE][LARGE], gameConfig[DIFFICULTY][STRESS_TEST]).then((game) => {
        this.game = game;
      });
    };
  }

  componentDidMount() {
    let resizeGame = () => {
      let widthToHeight = 960 / 540; // TODO is this magical ?
      let newWidth = window.innerWidth;
      let newHeight = window.innerHeight;
      let newWidthToHeight = newWidth / newHeight;

      this.setState({
        widthToHeight,
        newWidthToHeight,
        newWidth,
        newHeight
      });
    };

    window.addEventListener('resize', resizeGame, false);
    window.addEventListener('orientationchange', resizeGame, false);
    resizeGame();
  }

  startGame(levelData, difficulty) {
    levelData.width = 1920 * levelData.mapScale;
    levelData.height = 1080 * levelData.mapScale;

    return new Promise((resolve, reject) => {
      let gameCanvas = new GameCanvas({
        mapHeight: levelData.height,
        mapWidth: levelData.width,
        viewHeight: gameConfig[MAIN_VIEW_SIZE_Y],
        viewWidth: gameConfig[MAIN_VIEW_SIZE_X],
        onViewMapMove: (dataObj) => {
          this.selectedBox = dataObj.selectedBox;
        },
        onViewMapClick: (dataObj) => {
          this.game.dispatchAction({
            hits: dataObj.hits,
            name: CLICK,
            x: dataObj.x,
            y: dataObj.y,
            isMouseDown: dataObj.isMouseDown,
            dbClick: dataObj.dbClick,
            selectedBox: dataObj.selectedBox
          });
          this.selectedBox = null;
        }
      });

      let {map, minimap} = gameCanvas.getNewCanvasPairs({
        getMapRef: (API, el) => {
          this.setState({
            viewMapCanvasAPI: API
          });
        },
        getMiniRef: (API, el) => {
          this.setState({
            miniMapCanvasAPI: API
          });
        }
      });

      this.setState({
        gameCount: this.state.gameCount++,
        isMenuOpen: false,
        gamePaused: false,
        gameEnded: false,
        gameWon: null,
        map,
        minimap
      });


      // the loading overlay
      let div = document.createElement('div');
      div.className = 'loadingOverlay';
      div.innerHTML = i18n.loadingGameMsg;
      document.body.appendChild(div);

      // delay to next tick!
      setTimeout(() => {
        let game = new GameLoop({
          notificationSystem: this.updateGameState,
          levelData,
          viewSize: {
            viewHeight: gameConfig[MAIN_VIEW_SIZE_Y],
            viewWidth: gameConfig[MAIN_VIEW_SIZE_X]
          },
          difficulty,
          numPlayers: gameConfig[NUM_PLAYERS], // TODO, do we really need it here?
          renderSystem: this.renderOnCanvas
        });

        document.body.removeChild(div);
        resolve(game);
      }, 0);
    });
  }

  pauseGame() {
    this.game.stop();
    this.setState({
      isMenuOpen: false,
      gamePaused: true
    });
  }

  stopGame() {
    this.game.stop();
    this.setState({
      isMenuOpen: true,
      gamePaused: false,
      gameEnded: true
    });
  }

  resumeGame() {
    this.game.resume();
  }

  renderOnCanvas(systemArguments) {
    /* istanbul ignore else  */
    if (this.state.viewMapCanvasAPI) {
      renderSystem(
        systemArguments,
        this.state.viewMapCanvasAPI,
        this.state.miniMapCanvasAPI,
        this.selectedBox
      );
    }
  }

  // TODO if this is a system, why is it in the UI layer?
  // this is "just like any other system", but it sits at the App level..
  updateGameState(systemArguments) {
    let gameEnt = systemArguments.Entity.getByComps([GAME_STATE])[0];

    let gameTracker = systemArguments.gameTracker;
    if (gameEnt) {
      let gameWon = gameEnt[GAME_STATE].status === GAME_WON;
      let gameLost = gameEnt[GAME_STATE].status === GAME_LOST;


      // allow to hack my way..
      if (window.cheats_won) {
        gameWon = true;
      }

      if ((gameWon || gameLost) && !this.state.gameEnded) {
        this.stopGame();
        this.setState({
          gameEnded: true,
          isMenuOpen: false,
          gameReport: gameTracker.getReport(),
          gameWon
        });
      }
    }
  }

  getGameEndModal() {
    let gameWon = this.state.gameWon;

    if (gameWon !== null) {
      return (
        <Modal
          text={gameWon ? i18n.gameWon : i18n.gameLost}
          onClick={() => {
            this.startGame(this.currentLevel, this.difficulty).then((game) => {
              this.game = game;
            });
          }}
        >

          <div className="gameStats">
          <h4>{i18n.stats}</h4>
          {Object.keys(this.state.gameReport).map((key) => {
            return (<div key={key}>
              <span className="key">{i18n[key]}</span>
              <span className="value">{this.state.gameReport[key].count}</span>
            </div>);
          })}
          </div>
        </Modal>);
    } else {
      return null;
    }
  }

  mainMenu() {
    return (<MainMenu
      levels={levels}
      onLevelSelect={(level) => {
        this.currentLevel = level;
        this.difficulty = gameConfig[DIFFICULTY].EASY;

        console.log(this.currentLevel);
        this.startGame(this.currentLevel, this.difficulty).then((game) => {
          this.game = game;
        });
      }}
      onQuickStart={(menuSelection) => {
        this.currentLevel = Object.assign({...levels.random}, {
          mapScale: menuSelection.mapScale,
          planetsInMap: levels.random.planetsInMap * menuSelection.mapScale
        });

        console.log(this.currentLevel);
        this.difficulty = gameConfig[DIFFICULTY][menuSelection.difficulty];
        this.startGame(this.currentLevel, this.difficulty).then((game) => {
          this.game = game;
        });
      }}
    ></MainMenu>);
  }

  /**
   * "Pause Menu" is the menu shown to the player when the game is paused
   * @return {*}
   */
  pauseMenu() {
    if (!this.state.gamePaused) {
      return null;
    } else {
      return (
        <div className="splashMenu gamePaused">
          <div className="menuHeader">
            Game paused
          </div>
          <div className="menuButtons">
            <button className="btnItem" onClick={() => {
              this.setState({gamePaused: false});
              this.resumeGame();
            }}>
              Resume
            </button>
            <button className="btnItem" onClick={() => {
              this.setState({gamePaused: false});
              this.stopGame();
            }}>
              Exit
            </button>
          </div>
        </div>
      );
    }
  }

  render() {
    if (!this.state.isMenuOpen) {
      if (this.state.gamePaused) {
        return this.pauseMenu();
      } else {
        return (
          <div>
            <MainMenuBtn
              onClick={() => {
                this.setState({gamePaused: true});
                this.pauseGame();
              }}
            >
            </MainMenuBtn>
            <Minimap
              canvasReactElement={this.state.minimap}
            />
            <div className="container-fluid app">
              <div className="row">
                <MainView
                  widthToHeight={this.state.widthToHeight}
                  newWidthToHeight={this.state.newWidthToHeight}
                  newWidth={this.state.newWidth}
                  newHeight={this.state.newHeight}
                  viewMapCanvasAPI={this.state.viewMapCanvasAPI}
                  canvasElm={this.state.map}
                >
                </MainView>
              </div>
            </div>
            {this.getGameEndModal()}
          </div>
        );
      }
    } else {
      return this.mainMenu();
    }
  }
}
export default App;
