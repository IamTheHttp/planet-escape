import PlayerControlledComponent, {isSelected} from 'gameEngine/components/PlayerControlledComponent';
import {PLAYER_CONTROLLED} from 'gameEngine/constants';
import {Entity} from "game-platform";
import {BaseEntity} from "../../../src/gameEngine/BaseEntity";

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('renders', () => {
    let ent = new BaseEntity();
    ent.addComponent(new PlayerControlledComponent());

    expect(isSelected(null)).toBe(false);
    expect(isSelected(ent)).toBe(false);

    ent[PLAYER_CONTROLLED].selected = true;
    expect(isSelected(ent)).toBe(true);
  });
});