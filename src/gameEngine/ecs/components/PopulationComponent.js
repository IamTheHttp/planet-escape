/** @namespace entity.components.population */
import {POPULATION_COMP} from 'gameEngine/constants';
class PlanetResources {
  constructor(val = 10) {
    this.name = POPULATION_COMP;
    this.value = val;
    this.maxPop = 0;
  }
}

export default PlanetResources;