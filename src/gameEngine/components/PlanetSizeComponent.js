/** @namespace entity.components.planetSize */
import {PLANETSIZE_COMP} from 'gameEngine/constants';
class PlanetSizeComponent {
  constructor(val = 100) { // normalized around 100
    this.name = PLANETSIZE_COMP;
    this.value = val;
  }
}

export default PlanetSizeComponent;