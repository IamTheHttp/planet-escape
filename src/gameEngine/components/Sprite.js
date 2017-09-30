import {SPRITE} from 'gameEngine/constants';
class Sprite {
  constructor(image, spriteArgs) {
    this.name = SPRITE;
    this.sprite = image;
    this.spriteArgs = spriteArgs;
  }
}

export default Sprite;

export function getSprite(entity) {
  return entity[SPRITE].sprite;
}

export function getSpriteArgs(entity) {
  return entity[SPRITE].spriteArgs;
}
