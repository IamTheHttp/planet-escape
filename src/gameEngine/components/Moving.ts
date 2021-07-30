import {MOVING} from 'gameEngine/constants';
class Moving {
  public name : string;
  public isMoving: boolean;
  constructor(isMoving = true) {
    this.name = MOVING;
    this.isMoving = true;
  }
}

export default Moving;