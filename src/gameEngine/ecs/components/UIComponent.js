/** @namespace entity.components.ui */
import {UI_COMP} from 'gameEngine/constants';

class UIComponent{
  constructor(section){
    this.name = UI_COMP;
    this.section = section || '';
  }
}

export default UIComponent;