import logger from 'shared/logger';
import React from 'react';
import {render} from 'react-dom';
import Game from 'gameEngine/Game';
import PlanetList from 'ui/components/PlanetList/PlanetList';
import SummaryBar from 'ui/components/SummaryBar/SummaryBar';
import PlanetDetails from 'ui/components/PlanetDetails/PlanetDetails';

import {getOwner, hasOwner} from 'gameEngine/components/OwnerComponent';
import 'bootstrap/dist/css/bootstrap.css';
import {
  POPULATION_COMP,
  INCOME_COMP,
  GOLD_RESOURCE,
  UI_COMP,
  POSITION,
  TREASURY_COMP,
  CANVAS,
  PLANETS,
  SUMMARY,
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

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedEntity : false,
      buildingOptions : {}
    };
    this.game = {};
    this.selectPlanet = this.selectPlanet.bind(this);
    this.buildBuilding = this.buildBuilding.bind(this);
    this.handleBackToMap = this.handleBackToMap.bind(this);
    this.counter = 0;
  }

  componentDidMount() {
    this.game = new Game(this.updateGameState.bind(this), 16);
  }

  updateGameState(gameEntities, msFrame) {
    /* istanbul ignore else  */
    if (this.counter % 300 === 0) {
      logger.info(`Frame Duration ${msFrame.toPrecision(3)}`);
    }
    this.counter++;
    let planetSection = {};
    let summary = {};
    let buildingOptions = {};
    let totalPop = 0;
    let totalIncome = 0;
    let gold = 0;

    let entsToDraw = [];

    for (let id in gameEntities) {
      let ent = gameEntities[id];

      if (ent[UI_COMP].sections.find(byKey('name', CANVAS)) && ent[POSITION]) {
        entsToDraw.push(ent);
      }

      if (ent[UI_COMP].sections.find(byKey('name', PLANETS))) {
        if (hasOwner(ent) && getOwner(ent) === PLAYER_1) {
          planetSection[id] = ent;
        }
      }

      // if (ent[UI_COMP].sections.find(byKey('name',SUMMARY))) {
      //   totalPop = ent.components[POPULATION_COMP].value;
      //   totalIncome = ent.components[INCOME_COMP].value;
      //   gold = ent[TREASURY_COMP].items[GOLD_RESOURCE];
      // }

      if (ent[UI_COMP].sections.find(byKey('name', BUILDING_OPTIONS))) {
        buildingOptions[ent.id] = ent;
      }
    }

    this.setState({planetSection, summary, totalIncome, totalPop, gold, buildingOptions});

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
    if (this.state.selectedEntity) {
      planet = this.state.planetSection[this.state.selectedEntity];
    }
    // TODO - This 21px might need to be moved to a config
    return (
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
    );
  }
}

export default MainView;

