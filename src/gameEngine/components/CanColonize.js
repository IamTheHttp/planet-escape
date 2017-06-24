import {CAN_COLONIZE_COMP} from 'gameEngine/constants';
class CanColonize {
  constructor(distance = 100) {
    this.name = CAN_COLONIZE_COMP;
    this.distance = distance;
  }
}

export default CanColonize;

export function getColonizeDistance(ent) {
  return ent[CAN_COLONIZE_COMP].distance;
};