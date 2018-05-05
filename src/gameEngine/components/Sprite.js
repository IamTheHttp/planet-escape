import {SPRITE} from 'gameEngine/constants';
class Sprite {

  constructor(images) {
    this.name = SPRITE;
    this.images = images;
    // REFACTOR move this structure creation to a function, though it's not currently being used.
    // let imgs = [{
    //   name : 'PLANETS',
    //   pos : { // relative to the entity
    //     x,
    //     y
    //   },
    //   rotation : 0.5 // in radians, relative to the entity
    // }]
  }
}

export default Sprite;