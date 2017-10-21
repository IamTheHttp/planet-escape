/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {attack} from 'gameEngine/systems/userInputActions/attack';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter from 'gameEngine/entities/Ships/Fighter';
import PositionComponent, {hasDest, setDest} from 'gameEngine/components/PositionComponent';
import Entity from 'gameEngine/Entity';

import {
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  PLAYER_CONTROLLED
} from 'gameEngine/constants';



describe('Tests the attack action', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('Cannot attack a non attackable!', () => {
    let earth = new EarthLike(200, 200, PLAYER_1);

    let ship = {};
    earth[PLAYER_CONTROLLED].selected = true;
    expect(attack({x:200, y:300})).toBe(0);
  });

  it('Cannot attack own attackables', () => {
    let attacker = new EarthLike(200, 200, PLAYER_1);
    attacker[PLAYER_CONTROLLED].selected = true;
    let defender = new EarthLike(300, 300, PLAYER_1);

    expect(attack({x:200, y:200})).toBe(0);
  });

  it('Attack should direct fighters to target', () => {
    let attacker = new EarthLike(200, 200, PLAYER_1);
    attacker[PLAYER_CONTROLLED].selected = true;
    new Fighter(attacker);
    let defender = new EarthLike(300, 300, PLAYER_2);

    expect(attack({x:300, y:300})).toBe(1);
  });

  it('Attack should NOT redirect fighters to target', () => {
    let attacker = new EarthLike(200, 200, PLAYER_1);
    attacker[PLAYER_CONTROLLED].selected = true;
    new Fighter(attacker);
    let fighterWithDest = new Fighter(attacker);

    let defender = new EarthLike(300, 300, PLAYER_2);
    let defender2 = new EarthLike(500, 500, PLAYER_2);
    setDest(fighterWithDest, defender2);

    // even though the attacker has two fighters, since we passed in 'false', we redirect just one
    expect(attack({x:300, y:300}, [attacker], false)).toBe(1);

    // now with true the argument, we should point both of these fighters
    expect(attack({x:300, y:300}, [attacker], true)).toBe(2);
  });
});