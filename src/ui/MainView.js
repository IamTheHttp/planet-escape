import React from 'react';
import {render} from 'react-dom';
import Game from 'gameEngine/Game';
import PlanetList from 'ui/components/PlanetList/PlanetList';
import SummaryBar from 'ui/components/SummaryBar/SummaryBar';
import PlanetDetails from 'ui/components/PlanetDetails/PlanetDetails';
import 'bootstrap/dist/css/bootstrap.css';
import {POPULATION_COMP,INCOME_COMP,GOLD_COMP,UI_COMP} from 'gameEngine/constants';

class MainView extends React.Component{

  constructor(){
    super();
    this.state = {
      selectedEntity : false,
      buildingOptions : {}
    };
    this.game = {};
    this.selectPlanet = this.selectPlanet.bind(this);
    this.buildBuilding = this.buildBuilding.bind(this);
  }

  componentDidMount(){
    this.game = new Game(this.updateGameState.bind(this));
  }

  updateGameState(gameEntities){
    let planetSection = {};
    let summary = {};
    let buildingOptions = {};
    let totalPop = 0;
    let totalIncome = 0;
    let gold = 0;

    for(let id in gameEntities){
      let ent = gameEntities[id];
      if(ent.components[UI_COMP].section === 'planets'){
        planetSection[id] = ent;
      }

      if(ent.components[UI_COMP].section === 'summary'){
        totalPop = ent.components[POPULATION_COMP].value;
        totalIncome = ent.components[INCOME_COMP].value;
        gold = ent.components[GOLD_COMP].value;
      }

      if(ent.components[UI_COMP].section === 'buildingOptions'){
        buildingOptions[ent.id] = ent;
      }
    }
    this.setState({planetSection,summary,totalIncome,totalPop,gold,buildingOptions});
  }

  selectPlanet(entityID){
    this.setState({'selectedEntity': entityID});
  }

  buildBuilding(entityID){
    this.game.dispatchAction({
      name:'build',
      entityID,
      entities:[this.state.selectedEntity],
      amount:1
    });
  }

  render(){
    let planet = false;

    if(this.state.selectedEntity){
      planet = this.state.planetSection[this.state.selectedEntity];
    }

    return(
      <div className="container-fluid">
        <div className="row">
          <SummaryBar
            totalPop={this.state.totalPop}
            totalIncome={this.state.totalIncome}
            gold={this.state.gold}
          ></SummaryBar>
        </div>

        <div className="row">
          <PlanetList
            onClick={this.selectPlanet}
            dispatchGameAction={this.game.dispatchAction}
            planets={this.state.planetSection}></PlanetList>
          {planet && <PlanetDetails
            buildingOptions={this.state.buildingOptions}
            planet={planet}
            onClick={this.buildBuilding}
          >

          </PlanetDetails>}
        </div>
      </div>
    )
  }
}

export default MainView;