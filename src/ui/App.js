import 'polyfill/rAF.js';
import 'polyfill/perf.js';
import logger from 'shared/logger';
import React from 'react';
import {render} from 'react-dom';
import GameLoop from 'gameEngine/GameLoop';
import PlanetList from 'ui/components/PlanetList/PlanetList';
import SummaryBar from 'ui/components/SummaryBar/SummaryBar';
import PlanetDetails from 'ui/components/PlanetDetails/PlanetDetails';
import Modal from 'ui/components/Modal/Modal';
import {getOwner, hasOwner} from 'gameEngine/components/OwnerComponent';
import 'bootstrap/dist/css/bootstrap.css';
import {
  POPULATION_COMP,
  INCOME_COMP,
  GOLD_RESOURCE,
  UI_COMP,
  POSITION,
  TREASURY_COMP,
  GAME_STATE,
  CANVAS,
  PLANETS,
  SUMMARY,
  GAME_WON,
  GAME_LOST,
  IN_PROGRESS,
  BUILDING_OPTIONS,
  OWNER_COMPONENT,
  PLAYER_1
} from 'gameEngine/constants';
import CanvasMap from 'ui/components/CanvasMap/CanvasMap';

import {byKey} from 'shared/utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEntity : false,
      buildingOptions : {},
      gameEnt : {
        [GAME_STATE] : {
          status : null
        }
      }
    };
    this.game = {};
    this.getGameEndModal = this.getGameEndModal.bind(this);
    this.frameCount = 0;
  }

  startGame() {
    return new GameLoop(this.updateGameState.bind(this), 16);
  }

  stopGame() {
    window.cancelAnimationFrame(this.state.gameEnt[GAME_STATE].frameID);
  }

  componentDidMount() {
    this.game = this.startGame();
  }

  logFrame(msFrame) {
    /* istanbul ignore else  */
    if (this.frameCount % 300 === 0) {
      logger.info(`Frame Duration ${msFrame.toPrecision(3)}`);
    }
  }

  updateGameState(gameEntities, msFrame) {
    this.logFrame(msFrame);
    this.frameCount++;
    let planetSection = {};
    let gameEnt = null;
    let summary = {};
    let buildingOptions = {};
    let totalIncome = 0;

    let entsToDraw = [];

    for (let id in gameEntities) {
      let ent = gameEntities[id];

      if (ent.hasComponents(GAME_STATE)) {
        gameEnt = ent;
        continue; // TODO , this loop expects all entities to be UI entities
      }

      if (ent[UI_COMP].sections.find(byKey('name', CANVAS)) && ent[POSITION]) {
        entsToDraw.push(ent);
      }

      if (ent[UI_COMP].sections.find(byKey('name', PLANETS))) {
        if (hasOwner(ent) && getOwner(ent) === PLAYER_1) {
          planetSection[id] = ent;
        }
      }

      // not used for now
      // if (ent[UI_COMP].sections.find(byKey('name', BUILDING_OPTIONS))) {
      //   buildingOptions[ent.id] = ent;
      // }
    }

    this.setState({gameEnt, planetSection, summary, totalIncome, buildingOptions});

    /* istanbul ignore else  */
    if (this.canvasMap) {
      this.canvasMap.update(entsToDraw);
    }
  }

  // TODO - Not currently implemented
  // buildBuilding(entityID) {
  //   this.game.dispatchAction({
  //     name:'build',
  //     entityID,
  //     entities:[this.state.selectedEntity],
  //     amount:1
  //   });
  // }

  getGameEndModal() {
    let popUp = null;
    if (this.state.gameEnt[GAME_STATE].status === GAME_WON) {
      this.stopGame();
      popUp = (<Modal
        onClick={() => {
          this.game = this.startGame();
        }}
      ></Modal>);
    }
    return popUp;
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row" style={{height:'calc(100%)'}}>
            <PlanetList
              dispatchGameAction={this.game.dispatchAction}
              planets={this.state.planetSection}>
            </PlanetList>
            <CanvasMap
              ref={(inst) => {
                this.canvasMap = inst;
              }}
              dispatch={this.game.dispatchAction}
            >
            </CanvasMap>
          </div>
        </div>
        {this.getGameEndModal()}
      </div>
    );
  }
}

export default App;

