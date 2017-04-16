import React from 'react';
import {render} from 'react-dom';
import Game from '../gameEngine/Game';
import PlanetList from './components/PlanetList/PlanetList';
import SummaryBar from './components/SummaryBar/SummaryBar';
import 'bootstrap/dist/css/bootstrap.css';
class MainView extends React.Component{

  constructor(){
    super();
    this.state = {
      selectedEntity : false
    };
    this.game = {};
    this.selectPlanet = this.selectPlanet.bind(this);
    this.gameRender = this.gameRender.bind(this);
  }

  componentDidMount(){
    this.game = new Game(this.gameRender);
  }

  gameRender(gameEntities){
    let planetSection = {};
    let summary = {};
    let totalPop = 0;
    let totalIncome = 0;

    for(let id in gameEntities){
      let ent = gameEntities[id];
      if(ent.components.ui.section === 'planets'){
        planetSection[id] = ent;
      }

      if(ent.components.ui.section === 'summary'){
        totalPop = ent.components.population.value;
        totalIncome = ent.components.income.value;
      }
    }
    this.setState({planetSection,summary,totalIncome,totalPop});
  }

  selectPlanet(entityID){
    this.setState({'selectedEntity': entityID});
  }

  render(){
    let planetName;
    if(this.state.selectedEntity){
      let ent = this.state.planetSection[this.state.selectedEntity];
      planetName = ent.name;
    }

    return(
      <div className="container-fluid">
        <div className="row">
          <SummaryBar totalPop={this.state.totalPop} totalIncome={this.state.totalIncome}></SummaryBar>
        </div>

        <div className="row">
          <PlanetList onClick={this.selectPlanet} dispatchGameAction={this.game.dispatchAction} planets={this.state.planetSection}></PlanetList>
          <div className="container-fluid">
            <div className="row">
              <h1>{planetName}</h1>
              <br/>
              <h3>Construction</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainView;