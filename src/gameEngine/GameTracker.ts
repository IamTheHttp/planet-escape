/**
 * The game tracker allows us to register stuff?
 * The game tracker will currently only
 */
class GameTracker {
  private actions: Record<string, { count: number }>
  constructor() {
    this.actions = {};
  }

  track(action: string) {
    if (!this.actions[action]) {
      this.actions[action] = {
        count: 0
      };
    }

    this.actions[action].count++;
  }

  reset() {
    this.actions = {};
  }

  getReport() {
    return this.actions;
  }
}

const gameTracker = new GameTracker();

export {GameTracker, gameTracker};
