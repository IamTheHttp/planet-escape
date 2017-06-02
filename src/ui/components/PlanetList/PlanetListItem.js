import React from 'react';
import {
  BUILDINGS_COMP,
  POPULATION_COMP,
  INCOME_COMP,
  GOLD_RESOURCE,
  PLANETSIZE_COMP
} from 'gameEngine/constants';


class PlanetListItem extends React.Component {
  render() {
    let planet = this.props.planet;
    let curPop = planet.components[POPULATION_COMP].value;
    let maxPop = planet.components[POPULATION_COMP].maxPop;
    let income = planet.components[INCOME_COMP].value;
    let size   = planet.components[PLANETSIZE_COMP].value;
    let buildings   = planet.components[BUILDINGS_COMP].built;


    return (
      <div
        className={`planet ${(this.props.isFocused ? 'focus' : '')}` }
        onClick={() => {
          this.props.onClick(planet.id);
        }}
        key={planet.id}>

        <div>{planet.name}</div>
        <div>Pop: <span>{curPop.toFixed(0)}</span> / <span>{maxPop.toFixed(0)} b</span></div>
        <div>Income: {income.toFixed(0)}</div>
        <div>Planet Size: {size.toFixed(0)}</div>
        <div>Buildings: {buildings.length}</div>
      </div>
    );
  }
}

export default PlanetListItem;