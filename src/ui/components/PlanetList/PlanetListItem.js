import React from 'react';


class PlanetListItem extends React.Component{
  constructor(){
    super();
  }

  render(){
    let planet = this.props.planet;
    let curPop = planet.components.population.value;
    let maxPop = planet.components.population.maxPop;
    let income = planet.components.income.value;
    let size   = planet.components.planetSize.value;
    return (
      <div
        className={"planet " + (this.props.isFocused ? 'focus' : '')}
        onClick={()=>{this.props.onClick(planet.id)}}
        key={planet.id}>

        <div>{planet.name}</div>
        <div>Pop: <span>{curPop.toFixed(0)}</span> / <span>{maxPop.toFixed(0)} b</span></div>
        <div>Income: {income.toFixed(0)}</div>
        <div>Planet Size: {size.toFixed(0)}</div>
      </div>
    );
  }
}

export default PlanetListItem;