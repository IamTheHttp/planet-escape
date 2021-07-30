
import {attack} from 'gameEngine/systems/userInputActions/attack';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import PositionComponent, {hasDest, setDest} from 'gameEngine/components/PositionComponent';
import {gameConfig} from 'gameEngine/config';


import {
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  PLAYER_CONTROLLED,
  POSITION,
  FIGHTER_RADIUS
} from 'gameEngine/constants';
import {Entity} from "game-platform";
import {createFighterEntity, fighterPool} from "../../../../src/gameEngine/entities/Ships/Fighter";



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
    createFighterEntity(attacker);
    let defender = new EarthLike(300, 300, PLAYER_2);

    expect(attack({x:300, y:300})).toBe(1);
  });

  it('Should change fleet size ', () => {
    let attacker = new EarthLike(200, 200, PLAYER_1);
    attacker[PLAYER_CONTROLLED].selected = true;
    let firstFighter = createFighterEntity(attacker);
    createFighterEntity(attacker);
    createFighterEntity(attacker);
    createFighterEntity(attacker);
    createFighterEntity(attacker);
    createFighterEntity(attacker);
    createFighterEntity(attacker);
    createFighterEntity(attacker);
    let lastFighter = createFighterEntity(attacker);

    let defender = new EarthLike(300, 300, PLAYER_2);

    expect(attack({x:300, y:300})).toBe(9);

    // why 14? 9 + base(5)
    expect(firstFighter[POSITION].radius).toBe(gameConfig[FIGHTER_RADIUS]);

    // now let's destroy this fighter and nesure radius changes back

    firstFighter.remove();

    expect(firstFighter[POSITION].radius).toBe(gameConfig[FIGHTER_RADIUS]);
  });
});