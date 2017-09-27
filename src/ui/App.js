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

function byKey(key, value) {
  return (obj) => {
    return obj[key] === value;
  };
}

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
    this.selectPlanet = this.selectPlanet.bind(this);
    this.buildBuilding = this.buildBuilding.bind(this);
    this.handleBackToMap = this.handleBackToMap.bind(this);
    this.counter = 0;
  }

  componentDidMount() {
    this.game = new GameLoop(this.updateGameState.bind(this), 4);
  }

  updateGameState(gameEntities, msFrame) {
    /* istanbul ignore else  */
    if (this.counter % 300 === 0) {
      logger.info(`Frame Duration ${msFrame.toPrecision(3)}`);
    }
    this.counter++;
    let planetSection = {};
    let gameEnt = null;
    let summary = {};
    let buildingOptions = {};
    let totalPop = 0;
    let totalIncome = 0;
    let gold = 0;

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

      if (ent[UI_COMP].sections.find(byKey('name', BUILDING_OPTIONS))) {
        buildingOptions[ent.id] = ent;
      }
    }

    this.setState({gameEnt, planetSection, summary, totalIncome, totalPop, gold, buildingOptions});

    if (this.canvasMap) {
      this.canvasMap.update(entsToDraw);
    }
  }

  selectPlanet(entityID) {
    this.setState({selectedEntity: entityID});
  }

  buildBuilding(entityID) {
    this.game.dispatchAction({
      name:'build',
      entityID,
      entities:[this.state.selectedEntity],
      amount:1
    });
  }

  handleBackToMap() {
    this.setState({selectedEntity : false});
  }

  render() {
    let planet = false;
    let popUp = null;
    if (this.state.selectedEntity) {
      planet = this.state.planetSection[this.state.selectedEntity];
    }

    if (this.state.gameEnt[GAME_STATE].status === GAME_WON) {
      window.cancelAnimationFrame(this.state.gameEnt[GAME_STATE].frameID);
      popUp = (<Modal
        onClick={() => {
          this.game = new GameLoop(this.updateGameState.bind(this), 4);
        }}
      ></Modal>);
    }

    // TODO - This 21px might need to be moved to a config
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <SummaryBar
              totalPop={this.state.totalPop}
              totalIncome={this.state.totalIncome}
              gold={this.state.gold}
            ></SummaryBar>
          </div>

          <div className="row" style={{height:'calc(100% - 21px)'}}>
            <PlanetList
              onClick={this.selectPlanet}
              dispatchGameAction={this.game.dispatchAction}
              planets={this.state.planetSection}>
            </PlanetList>

            {planet && <PlanetDetails
              buildingOptions={this.state.buildingOptions}
              planet={planet}
              onClick={this.buildBuilding}
              onBackToMap={this.handleBackToMap}
            >

            </PlanetDetails>}
            {!planet && <CanvasMap
              ref={(inst) => {
                this.canvasMap = inst;
              }}
              dispatch={this.game.dispatchAction}
            >
            </CanvasMap>}
          </div>
        </div>
        {popUp}
      </div>
    );
  }
}

export default App;

