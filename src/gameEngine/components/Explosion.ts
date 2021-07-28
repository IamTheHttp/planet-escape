import {EXPLOSION} from 'gameEngine/constants';

class Explosion {
  public name: string;
  public times: number;

  constructor() {
    this.name = EXPLOSION;
    this.times = 0;
  }
}

export default Explosion;