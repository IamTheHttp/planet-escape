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
  FIGHTER_BUILD_RATE,
  EVENTS
} from 'gameEngine/constants';
import React from 'react';
import './global.scss';
import GameLoop from 'gameEngine/Game';
import Modal from 'ui/components/Modal/Modal';
import MainMenu from 'ui/components/MainMenu/MainMenu';
import {IDifficulty, gameConfig} from 'gameEngine/config';
import MainMenuBtn from 'ui/components/MainMenuBtn/MainMenuBtn';
import ShowHelpBtn from 'ui/components/ShowHelpBtn/ShowHelpBtn';
import Minimap from 'ui/components/Minimap/Minimap';
import MainView from 'ui/components/MainView/MainView';
import renderSystem from 'gameEngine/systems/renderSystem';
import i18n from 'ui/i18n';
import {levels} from './levels';
import Help from 'ui/components/MainMenu/Help';
import PlayerSelection from 'ui/components/PlayerSelection/PlayerSelection';
import CookiePolicy from 'ui/components/CookiePolicy/CookiePolicy';

import {playerService} from 'services/PlayerService';
import globalTracker from 'services/globalTracker';
import Game from "gameEngine/Game";
import {ILevelData, IPlayer, ISystemArguments} from "../interfaces/interfaces";
import {GameCanvas} from "game-platform";
import {BaseEntity} from "../gameEngine/BaseEntity";
import CanvasAPI from "game-platform/dist/lib/CanvasAPI/CanvasAPI";
import {ISelectedBoxData} from "game-platform/dist/lib/interfaces";


interface IProps {

}

interface IState {
  newHeight: number;
  widthToHeight: number;
  newWidthToHeight: number;
  newWidth: number;
  gameCount: number;
  showHelp: boolean;
  isMenuOpen: boolean;
  showLevelHints: boolean;
  levelHints: string[]
  gamePaused: boolean;
  gameEnded: boolean;
  gameWon: boolean | null;
  selectedPlayer: IPlayer;
  currentLevel: ILevelData;
  showPlayerManagement:boolean;
  viewMapCanvasAPI: CanvasAPI;
  miniMapCanvasAPI: CanvasAPI;
  map: HTMLCanvasElement;
  minimap: HTMLCanvasElement;
  gameReport: Record<string, { count: number }>;
}


class App extends React.Component<IProps, Partial<IState>> {
  public game: Game;
  public levels: ILevelData[];
  public selectedBox : ISelectedBoxData;
  public difficulty: IDifficulty;


  constructor(props: IProps) {
    super(props);
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
      // @ts-ignore TODO add types for gameConfig;
      this.startGame(gameConfig[MAP_SIZE][LARGE], gameConfig[DIFFICULTY][STRESS_TEST]).then((game: Game) => {
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

  startGame(levelData: ILevelData, difficulty: IDifficulty): Promise<Game> {
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
            entities: null,
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
        getMapRef: (API: CanvasAPI) => {
          this.setState({
            viewMapCanvasAPI: API
          });
        },
        getMiniRef: (API: CanvasAPI) => {
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
            viewWidth: gameConfig[MAIN_VIEW_SIZE_X],
            mapWidth: null,
            mapHeight: null
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
          gameCount: this.state.gameCount + 1,
          isMenuOpen: false,
          gamePaused: false,
          gameEnded: false,
          gameWon: null,
          showLevelHints: levelData.hints.length > 0,
          levelHints: levelData.hints,
          currentLevel: levelData,
          map,
          minimap
        });

        globalTracker.dispatch(EVENTS.LEVEL_STARTED, {
          levelKey: levelData.key,
          levelOrder: levelData.order
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

  renderOnCanvas(systemArguments: ISystemArguments) {
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
  updateGameState(systemArguments: ISystemArguments) {
    let gameEnt = systemArguments.Entity.getByComps([GAME_STATE])[0] as BaseEntity;

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

      if (gameWon) {
        globalTracker.dispatch(EVENTS.LEVEL_COMPLETE, {
          levelKey: this.state.currentLevel.key,
          levelOrder: this.state.currentLevel.order
        });
      } else if (gameLost) {
        globalTracker.dispatch(EVENTS.LEVEL_FAILED, {
          levelKey: this.state.currentLevel.key,
          levelOrder: this.state.currentLevel.order
        });
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
    let nextLevel:ILevelData;

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
        let randLevel:ILevelData = {
          height: null,
          hints: [],
          order: 0,
          width: 0,
          planets: [],
          key: 'unknown',
          buffer: 2,
          mapScale: +menuSelection.mapScale,
          planetsInMap: 20 * parseFloat(menuSelection.mapScale)
        };

        // @ts-ignore TODO improve types for gameConfig
        this.difficulty = gameConfig[DIFFICULTY][menuSelection.difficulty];

        this.startGame(randLevel, this.difficulty).then((game) => {
          this.game = game;
        });
      }}
    />);
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
        />
      );
    }
  }

  handlePlayerSelect(selectedPlayer: IPlayer) {
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
        />
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
        <CookiePolicy/>
      </div>
    );
  }
}

export default App;
