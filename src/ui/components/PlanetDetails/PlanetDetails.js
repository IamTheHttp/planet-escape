import React from 'react';
import './innerPage.css';
class PlanetDetails extends React.Component{

  constructor(){
    super();

  }

  render(){
    let planetName = this.props.planet.name;

    if(!planetName){
      return (<h1 className="container-fluid">Select a planet</h1>);
    }
    else{
      return(
        <div className="innerPage">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
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
}

export default PlanetDetails;