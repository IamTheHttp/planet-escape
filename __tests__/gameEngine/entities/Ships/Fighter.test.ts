
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {POSITION} from 'gameEngine/constants';
import {Entity} from "game-platform";
import {createFighterEntity, fighterPool} from "../../../../src/gameEngine/entities/Ships/Fighter";

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
    fighterPool.reset();
  });

  it('Ensures a fighter has position', () =>  {
    let planet = new EarthLike(200, 300);
    let ship = createFighterEntity(planet);
    expect(ship[POSITION].x).toBe(200);
    expect(ship[POSITION].y).toBe(300);
  });
});