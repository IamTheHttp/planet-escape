/** @namespace entity.components.localBonus */
import {PLANETBONUS_COMP} from 'gameEngine/constants';
class PlanetBonusComponent {
  constructor() {
    this.name = PLANETBONUS_COMP;
    this.bonuses = {};
    this.mod = {};
    this.base = {};
  }
}

export default PlanetBonusComponent;
// TODO - REMOVE THIS COMPONENT
// export const getMod = (ent, item) => {
//   return ent[PLANETBONUS_COMP].mod[item];
// };
//
// export const getBase = (ent, item) => {
//   return ent[PLANETBONUS_COMP].base[item];
// };

