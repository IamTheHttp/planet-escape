import {GameTracker} from "../../src/gameEngine/GameTracker";

describe('Tests a component', () => {
  let gameTracker: GameTracker;

  beforeEach(() => {
    gameTracker = new GameTracker();
  });

  it('renders', () => {
    expect(gameTracker.actions).toEqual({});

    gameTracker.track('startGame');
    gameTracker.track('startGame');
    gameTracker.track('startGame');
    gameTracker.track('startGame');

    expect(gameTracker.getReport().startGame.count).toBe(4);

    gameTracker.reset();
    expect(gameTracker.actions.startGame).toBeUndefined();
  });
});