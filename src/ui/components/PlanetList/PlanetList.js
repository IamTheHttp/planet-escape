import React from 'react';
import './sideMenu.css';

class PlanetList extends React.Component{

  constructor(){
    super();
    this.state = {};
  }

  handleClick(entityID){
    this.props.onClick(entityID);
    this.setState({'clickedEntity' : entityID})
  }

  render(){
    let arr = [];
    for(let id in this.props.planets){

      let planet = this.props.planets[id];
      let curPop = planet.components.population.value;
      let maxPop = planet.components.population.maxPop;
      let income = planet.components.income.value;
      let size   = planet.components.planetSize.value;

      let isFocused = this.state.clickedEntity === id;

      arr.push(
        <div className={"planet " + (isFocused ? 'focus' : '')}
                    onClick={()=>{this.handleClick(id)}}
                    key={id}>

        <div>{planet.name}</div>
        <div>Pop: <span>{curPop.toFixed(0)}</span> / <span>{maxPop.toFixed(0)} b</span></div>
        <div>Income: {income.toFixed(0)}</div>
        <div>Planet Size: {size.toFixed(0)}</div>
      </div>
      );
    }

    return(
      <div className="sideMenu">
        {arr}
      </div>
    )
  }
}

export default PlanetList;