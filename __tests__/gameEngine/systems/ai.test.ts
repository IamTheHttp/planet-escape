
import {
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  AI_DECISION_RATE
} from 'gameEngine/constants';
import {ISystemArguments} from "../../../src/interfaces/interfaces";
import {createFighterEntity, FighterEntity, fighterPool} from "../../../src/gameEngine/entities/Ships/Fighter";
import {getDest} from "../../../src/gameEngine/components/PositionComponent";
import ai from "../../../src/gameEngine/systems/ai";
import EarthLike from "../../../src/gameEngine/entities/planets/EarthLike";
import {Entity} from "game-platform";

describe('Tests a component', () => {
  let systemArguments: ISystemArguments;

  beforeEach(() => {
    // setup the test
    Entity.reset();
    fighterPool.reset();
    systemArguments = {
      Entity: null,
      levelData: null,
      gameTracker: null,
      numPlayers: 1,
      viewSize: null,
      count : 0,
      difficulty : {
        [AI_DECISION_RATE] : 1
      }
    };
  });

  it('Tests that without enough fighters, the enemy planet does nothing', () => {
    let attacker = new EarthLike(80, 80, PLAYER_2);
    createFighterEntity(attacker);
    expect(ai(systemArguments)).toBe(false);
  });

  it('Tests that with enough fighters, the enemy planet tries to expand', () => {
    new EarthLike(100, 100, NEUTRAL);
    new EarthLike(50, 50, PLAYER_1);
    let attacker = new EarthLike(80, 80, PLAYER_2);

    let fighter1 = createFighterEntity(attacker);
    let fighter2 = createFighterEntity(attacker);
    let fighter3 = createFighterEntity(attacker);
    let fighter4 = createFighterEntity(attacker);
    let fighter5 = createFighterEntity(attacker);
    let fighter6 = createFighterEntity(attacker);

    ai(systemArguments);
    expect(getDest(fighter1).x).toBe(100);
    expect(getDest(fighter1).y).toBe(100);
    // expect(ai()).toBe(false);
  });

  it('Tests that with enough fighters and no neutrals, the enemy attacks', () => {
    new EarthLike(50, 50, PLAYER_1);
    let attacker = new EarthLike(80, 80, PLAYER_2);

    let fighter1 = createFighterEntity(attacker);
    let fighter2 = createFighterEntity(attacker);
    let fighter3 = createFighterEntity(attacker);
    let fighter4 = createFighterEntity(attacker);
    let fighter5 = createFighterEntity(attacker);
    let fighter6 = createFighterEntity(attacker);
    ai(systemArguments);
    expect(getDest(fighter1).x).toBe(50);
    expect(getDest(fighter1).y).toBe(50);
  });

  it('Tests that with enough fighters and two neutrals, enemy expands to closest', () => {
    new EarthLike(50, 50, PLAYER_1);

    new EarthLike(0, 0, NEUTRAL);
    new EarthLike(100, 100, NEUTRAL);
    new EarthLike(1000, 1000, NEUTRAL);
    let attacker = new EarthLike(80, 80, PLAYER_2);

    let fighter1 = createFighterEntity(attacker);
    let fighter2 = createFighterEntity(attacker);
    let fighter3 = createFighterEntity(attacker);
    let fighter4 = createFighterEntity(attacker);
    let fighter5 = createFighterEntity(attacker);
    let fighter6 = createFighterEntity(attacker);
    ai(systemArguments);
    expect(getDest(fighter1).x).toBe(100);
    expect(getDest(fighter1).y).toBe(100);
  });
});