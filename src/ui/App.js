import {
  GAME_STATE,
  GAME_WON,
  GAME_LOST,
  MAP_SIZE,
  DIFFICULTY,
  NUM_PLAYERS,
  CLICK,
  MAIN_VIEW_SIZE_X,
  MAIN_VIEW_SIZE_Y,
  LARGE,
  STRESS_TEST,
  FIGHTER_BUILD_RATE
} from 'gameEngine/constants';
import React from 'react';
import './global.scss';
import GameLoop from 'gameEngine/Game';
import Modal from 'ui/components/Modal/Modal';
import MainMenu from 'ui/components/MainMenu/MainMenu';
import gameConfig from 'gameEngine/config';
import MainMenuBtn from 'ui/components/MainMenuBtn/MainMenuBtn';
import ShowHelpBtn from 'ui/components/ShowHelpBtn/ShowHelpBtn';
import Minimap from 'ui/components/Minimap/Minimap';
import MainView from 'ui/components/MainView/MainView';
import renderSystem from 'gameEngine/systems/renderSystem';
import GameCanvas from 'lib/GameCanvas/GameCanvas';
import i18n from 'ui/i18n';
import levels from './levels';
import Help from 'ui/components/MainMenu/Help';
import PlayerSelection from 'ui/components/PlayerSelection/PlayerSelection';

import playerService from 'services/PlayerService';

class App extends React.Component {
  constructor() {
    super();
    this.game = {};
    this.state = {
      gameCount: 0,
      showHelp: false,
      isMenuOpen: true,
      gamePaused: false,
      gameEnded: true, // TODO - Why do we need a "gameEnded" AND a won/lost state?
      gameWon: null, // null means the game was not yet decided
      selectedPlayer: playerService.getSelectedPlayer(),
      showPlayerManagement: false
    };
    this.updateGameState = this.updateGameState.bind(this);
    this.renderOnCanvas = this.renderOnCanvas.bind(this);
    this.startGame = this.startGame.bind(this);
    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.handlePlayerDelete = this.handlePlayerDelete.bind(this);
    this.levels = levels;

    /* istanbul ignore next */
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

    setInterval(() => {
      if (this.state.newHeight !== window.innerHeight) {
        resizeGame();
      }
    }, 500);
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

      // the loading overlay
      let loadingScreen = document.createElement('div');
      loadingScreen.className = 'loadingOverlay';
      loadingScreen.innerHTML = `\n<div>"${levelData.key || i18n.unknown}"</div>\n<div>${i18n.loadingGameMsg}</div>`;
      document.body.appendChild(loadingScreen);


      // this tick delay ensures that that the loading screen is visible
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

        if (levelData.hints) {
          setTimeout(() => {
            game.stop(); // game starts paused but rendered on canvas
          }, 4);
        }

        document.body.removeChild(loadingScreen);

        this.setState({
          gameCount: this.state.gameCount++,
          isMenuOpen: false,
          gamePaused: false,
          gameEnded: false,
          gameWon: null,
          showLevelHints: !!levelData.hints,
          levelHints: levelData.hints,
          currentLevel : levelData,
          map,
          minimap
        });
        resolve(game);
      }, 50);
    });
  }

  pauseGame() {
    this.game.stop();
    this.setState({
      isMenuOpen: false,
      gamePaused: true,
      showLevelHints: false // don't show the levelHints when coming back from the hints or menu
    });
  }

  stopGame() {
    this.game.stop();
    this.setState({
      gameWon: null,
      isMenuOpen: true,
      gamePaused: false,
      gameEnded: true,
      showHelp: false
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


      if (gameWon) {
        // selectedPlayer
        if (this.state.currentLevel) {
          playerService.finishLevel(this.state.currentLevel.key);
        }
      }

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
    let nextLevel;

    let currentLevelIdx = this.levels.indexOf(this.state.currentLevel);
    nextLevel = this.levels[currentLevelIdx + 1];

    if (gameWon !== null) {
      return (
        <Modal
          gameWon={gameWon}
          text={gameWon ? i18n.gameWon : i18n.gameLost}
          nextLevel={nextLevel}
          onRestart={() => {
            this.startGame(this.state.currentLevel, this.difficulty).then((game) => {
              this.game = game;
            });
          }}
          onNextLevel={() => {
            this.startGame(nextLevel, this.difficulty).then((game) => {
              this.game = game;
            });
          }}
          backToMainMenu={() => {
            this.setState({gamePaused: false});
            this.stopGame();
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
      selectedPlayer={this.state.selectedPlayer}
      onPlayerSelect={this.handlePlayerSelect}
      onPlayerDelete={this.handlePlayerDelete}
      levels={levels}
      onLevelSelect={(level, levels) => {
        this.levels = levels; // TODO why do we need it here?
        this.difficulty = gameConfig[DIFFICULTY].EASY;

        this.startGame(level, this.difficulty).then((game) => {
          this.game = game;
        });
      }}
      onQuickStart={(menuSelection) => {
        let randLevel = {
          buffer: 2,
          mapScale: menuSelection.mapScale,
          planetsInMap: 20 * menuSelection.mapScale
        };

        this.difficulty = gameConfig[DIFFICULTY][menuSelection.difficulty];
        this.startGame(randLevel, this.difficulty).then((game) => {
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
        <div className="centered md gamePausedMenu">
          <div className="menuHeader">
            Game paused
          </div>
          <div className="btnList">
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

  showHelp() {
    if (!this.state.showHelp) {
      return null;
    } else {
      return (
        <Help
          levelHints={this.state.currentLevel.hints}
          onClick={() => {
            this.setState({
              gamePaused: false,
              showHelp: false
            });
            this.resumeGame();
          }}
        ></Help>
      );
    }
  }

  handlePlayerSelect(selectedPlayer) {
    this.setState({
      selectedPlayer
    });
  }

  handlePlayerDelete() {
    this.setState({
      selectedPlayer: playerService.getSelectedPlayer()
    });
  }

  render() {
    let content = null;

    if (!this.state.selectedPlayer || this.state.showPlayerManagement) {
      content = (
        <PlayerSelection
          onPlayerSelect={this.handlePlayerSelect}
          onPlayerDelete={this.handlePlayerDelete}
        ></PlayerSelection>
      );
    } else if (this.state.gameWon !== null) {
      content = this.getGameEndModal();
    } else if (this.state.showHelp) {
      content = this.showHelp();
    } else if (this.state.isMenuOpen) {
      content = this.mainMenu();
    } else if (this.state.gamePaused) {
      content = this.pauseMenu();
    } else {
      content = (
        <div>
          <div className="inGameBtns">
            {!this.state.showLevelHints && <ShowHelpBtn
              onClick={() => {
                this.pauseGame();
                // show the hints?
                this.setState({
                  showHelp: true
                });
              }}
            >
            </ShowHelpBtn>}
            {!this.state.showLevelHints && <MainMenuBtn
              onClick={() => {
                this.pauseGame();
              }}
            >
            </MainMenuBtn>}
          </div>
          <Minimap
            canvasReactElement={this.state.minimap}
            currentLevelData={this.state.currentLevel}
          />
          <div className="container-fluid app">
            <div className="">
              <MainView
                levelHints={this.state.levelHints}
                showLevelHints={this.state.showLevelHints}
                onLevelHintsApproved={() => {
                  this.setState({
                    showLevelHints: false
                  });
                  this.resumeGame();
                }}
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
        </div>
      );
    }

    return (
      <div className="page">
        <div className="pageContent">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
