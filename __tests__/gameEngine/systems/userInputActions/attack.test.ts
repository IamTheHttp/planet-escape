
import {attack} from 'gameEngine/systems/userInputActions/attack';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Fighter, {fighterPool} from 'gameEngine/entities/Ships/Fighter';
import PositionComponent, {hasDest, setDest} from 'gameEngine/components/PositionComponent';
import Entity from '../../../../src/lib/ECS/Entity';
import gameConfig from 'gameEngine/config';


import {
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  PLAYER_CONTROLLED,
  POSITION,
  FIGHTER_RADIUS
} from 'gameEngine/constants';



describe('Tests the attack action', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
    fighterPool.reset();
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

  it('Should change fleet size ', () => {
    let attacker = new EarthLike(200, 200, PLAYER_1);
    attacker[PLAYER_CONTROLLED].selected = true;
    let firstFighter = new Fighter(attacker);
    new Fighter(attacker);
    new Fighter(attacker);
    new Fighter(attacker);
    new Fighter(attacker);
    new Fighter(attacker);
    new Fighter(attacker);
    new Fighter(attacker);
    let lastFighter = new Fighter(attacker);

    let defender = new EarthLike(300, 300, PLAYER_2);

    expect(attack({x:300, y:300})).toBe(9);

    // why 14? 9 + base(5)
    expect(firstFighter[POSITION].radius).toBe(gameConfig[FIGHTER_RADIUS]);

    // now let's destroy this fighter and nesure radius changes back

    firstFighter.remove();

    expect(firstFighter[POSITION].radius).toBe(gameConfig[FIGHTER_RADIUS]);
  });
});