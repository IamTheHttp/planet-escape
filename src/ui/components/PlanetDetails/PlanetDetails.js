import React from 'react';
import './innerPage.css';
import {PLANETBONUS_COMP} from 'gameEngine/constants';
class PlanetDetails extends React.Component {
  renderBuildOptions() {
    return Object.keys(this.props.buildingOptions).map((id) => {
      let ent = this.props.buildingOptions[id];
      return (<h3
        className="planetBonuse"
        onClick={ () => {
          this.props.onClick(id);
        }}
        key={id}>{ent.name}</h3>
      );
    });
  }

  renderPlanetBonuses() {
    let mod = this.props.planet.components[PLANETBONUS_COMP].mod;

    return Object.keys(mod).map((itemName) => {
      let value = mod[itemName];
      return (<div key={itemName}>
        <h5>{itemName} -- {value}</h5>
      </div>);
    });
  }

  render() {
    let planetName = this.props.planet.name;

    return (
      <div className="innerPage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div>
                <h1>{planetName}</h1>
                --
                <h4 onClick={this.props.onBackToMap}>Back to star map</h4>
              </div>
              <br/>
              <h3>Planet Bonuses</h3>
              <div>
                {this.renderPlanetBonuses()}
              </div>
              <br/>

              <h3>Construction</h3>
              <div>
                {this.renderBuildOptions()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PlanetDetails.defaultProps = {
  buildingOptions : {}
};
export default PlanetDetails;