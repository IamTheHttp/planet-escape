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
  MAIN_VIEW_SIZE_Y
} from 'gameEngine/constants';
import React from 'react';
import './global.scss';
import GameLoop from 'gameEngine/Game';
import Modal from 'ui/components/Modal/Modal';
import MainMenu from 'ui/components/MainMenu/MainMenu';
import gameConfig from 'gameEngine/config';
import MainMenuBtn from 'ui/components/MainMenuBtn/MainMenuBtn';
import Sidebar from 'ui/components/Sidebar/Sidebar';
import MainView from 'ui/components/MainView/MainView';
import renderSystem from 'gameEngine/systems/renderSystem';
import GameCanvas from 'lib/GameCanvas/GameCanvas';
// TODO - improve test coverage to at least 90% before merge
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
  }

  componentDidMount() {
    let resizeGame = () => {
      let widthToHeight = 960 / 540;
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

  startGame(mapSize, difficulty) {
    let gameCanvas = new GameCanvas({
      mapHeight: mapSize[CANVAS_Y],
      mapWidth: mapSize[CANVAS_X],
      viewHeight: gameConfig[MAIN_VIEW_SIZE_Y],
      viewWidth: gameConfig[MAIN_VIEW_SIZE_X],
      onViewMapMove: (dataObj) => {
        this.selectedBox = dataObj.selectedBox;
      },
      onViewMapClick: (dataObj) => {
        this.game.dispatchAction({
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
      gameWon: null, // null means the game was not yet decided
      map,
      minimap
    });

    // at this point, no canvas exists yet.. crap
    return new GameLoop({
      notificationSystem: this.updateGameState,
      mapSize,
      difficulty,
      numPlayers: gameConfig[NUM_PLAYERS],
      renderSystem: this.renderOnCanvas
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

  updateGameState(systemArguments) {
    let gameEnt = systemArguments.Entity.getByComps([GAME_STATE])[0];

    if (gameEnt) {
      let gameWon = gameEnt[GAME_STATE].status === GAME_WON;
      let gameLost = gameEnt[GAME_STATE].status === GAME_LOST;

      if ((gameWon || gameLost) && !this.state.gameEnded) {
        this.stopGame();
        this.setState({
          gameEnded: true,
          isMenuOpen: false,
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
          text={gameWon ? 'Game Won!' : 'Game lost!'}
          onClick={() => {
            this.game = this.startGame(this.mapSize, this.difficulty);
          }}
        ></Modal>);
    } else {
      return null;
    }
  }

  mainMenu() {
    return (<MainMenu
      onQuickStart={(menuSelection) => {
        this.mapSize = gameConfig[MAP_SIZE][menuSelection.mapSize];
        this.difficulty = gameConfig[DIFFICULTY][menuSelection.difficulty];
        this.game = this.startGame(this.mapSize, this.difficulty);
      }}
    ></MainMenu>);
  }

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
                // TODO this needs to be pause game
                // now when paused, render the "mid game menu"
                // mid game menu needs to have "resume, help and exit"
                this.setState({gamePaused: true});
                this.pauseGame();
              }}
            >
            </MainMenuBtn>
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
                <Sidebar
                  canvasElm={this.state.minimap}
                >
                </Sidebar>
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
/*


 */