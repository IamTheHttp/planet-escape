/** @namespace entity.components.buildings.inProgress */
/** @namespace entity.components.buildings.built */
import {BUILDINGS_COMP} from 'gameEngine/constants';
class BuildingsComponent{
  constructor(val = []){
    this.name = BUILDINGS_COMP;
    this.built = val;
    this.inProgress = [];
  }
}

export default BuildingsComponent;