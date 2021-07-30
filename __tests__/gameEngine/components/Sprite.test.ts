import {
  PLANETS,
  SPRITE
} from 'gameEngine/constants';
import {Entity} from "game-platform";
import Sprite from "../../../src/gameEngine/components/Sprite";
import {BaseEntity} from "../../../src/gameEngine/BaseEntity";

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('init new component', () => {
    let data = {};
    let compDefault = new Sprite([{
      name : PLANETS
    }]);
    let ent = new BaseEntity();
    ent.addComponent(compDefault);
    expect(ent[SPRITE].images.length).toBe(1);
  });
});