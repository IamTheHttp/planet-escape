import React from 'react';
import {
  BUILDINGS_COMP,
  POPULATION_COMP,
  INCOME_COMP,
  GOLD_RESOURCE,
  PLANETSIZE_COMP,
  HAS_FIGHTERS,
  IS_DOCKED
} from 'gameEngine/constants';


class PlanetListItem extends React.Component {
  render() {
    let planet = this.props.planet;
    let curPop = planet[POPULATION_COMP].value;
    let maxPop = planet[POPULATION_COMP].maxPop;
    let income = planet[INCOME_COMP].value;
    let size   = planet[PLANETSIZE_COMP].value;
    let buildings   = planet[BUILDINGS_COMP].built;
    let fighters   = planet[HAS_FIGHTERS].fighters.filter((fighter) => {
      return fighter[IS_DOCKED].isDocked;
    });

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
        <div>Fighters: {fighters.length}</div>
      </div>
    );
  }
}

export default PlanetListItem;