/** @namespace entity.components.ui */
import {UI_COMP} from 'gameEngine/constants';

class UIComponent{
  constructor(sections){
    if(!Array.isArray(sections)){
      sections = [sections];
    }
    this.name = UI_COMP;
    this.section = sections;
  }
}

export default UIComponent;