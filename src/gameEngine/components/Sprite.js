import {SPRITE} from 'gameEngine/constants';
class Sprite {

  constructor(images) {
    this.name = SPRITE;
    this.images = images;
    // TODO move this structure creation to a function
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

// TODO remove these useless funcitons
export function getSprite(entity) {
  return entity[SPRITE].sprite;
}
// TODO remove these useless funcitons
export function getSpriteArgs(entity) {
  return entity[SPRITE].spriteArgs;
}
