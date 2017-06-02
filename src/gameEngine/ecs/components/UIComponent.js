/** @namespace entity.components.ui */
import {UI_COMP} from 'gameEngine/constants';

class UIComponent {
  constructor(sections) {
    this.name = UI_COMP;
    this.section = Array.isArray(sections) ? sections : [sections];
  }
}

export default UIComponent;