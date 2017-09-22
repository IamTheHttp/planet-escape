/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {attack} from 'gameEngine/systems/userInputActions/attack';
import Mothership from 'gameEngine/entities/Ships/Mothership';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  PLAYER_CONTROLLED
} from 'gameEngine/constants';



describe('Tests the attack action', () => {
  beforeEach(() => {
    // setup the test
  });

  it('Cannot attack a non attackable!', () => {
    let earth = new EarthLike(50, 50, 200, 200, PLAYER_1);
    let ship = new Mothership(200, 300, PLAYER_2);

    earth[PLAYER_CONTROLLED].selected = true;
    expect(attack({x:200, y:300})).toBe(0);
  });

  it('Cannot attack own attackables', () => {
    let attacker = new EarthLike(50, 50, 200, 200, PLAYER_1);
    attacker[PLAYER_CONTROLLED].selected = true;
    let defender = new EarthLike(50, 50, 300, 300, PLAYER_1);

    expect(attack({x:200, y:200})).toBe(0);
  });
});