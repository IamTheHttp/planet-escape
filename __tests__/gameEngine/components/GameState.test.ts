import {GameState} from 'gameEngine/components/GameState';
import {
  PLAYER_1,
  IN_PROGRESS,
  GAME_WON
} from 'gameEngine/constants';
import {Entity} from "game-platform";

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('init new component', () => {
    let compDefault = new GameState(null, null);
    expect(compDefault.status).toBe(IN_PROGRESS);

    let comp = new GameState(GAME_WON, null);
    expect(comp.status).toBe(GAME_WON);
  });
});