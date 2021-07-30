import {MOVEMENT_COMP} from 'gameEngine/constants';
class MoveComponent {
  public name: string;
  public speed:number;
  constructor(speed: number) {
    this.name = MOVEMENT_COMP;
    this.speed = speed;
  }
}

export default MoveComponent;
