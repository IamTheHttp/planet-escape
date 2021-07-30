import {
  PLAYER_CONTROLLED,
  POSITION,
  OWNER_COMPONENT,
  MOVE,
  CLICK,
  NEUTRAL,
  PLAYER_1,
  PLAYER_2,
  ATTACK
} from 'gameEngine/constants';
import {ISelectedBoxData} from "game-platform/types/lib/interfaces";
import {Entity} from "game-platform";
import userInputSystem, {pushAction} from "../../../src/gameEngine/systems/userInputSystem";
import {createFighterEntity} from "../../../src/gameEngine/entities/Ships/Fighter";
import EarthLike from "../../../src/gameEngine/entities/planets/EarthLike";
import {getFighters} from "../../../src/gameEngine/components/HasFighters";


function getSelectedBox(x: number, y: number): ISelectedBoxData {
  return {
    width: null,
    height:null,
    start : {
      x,
      y
    },
    end : {
      x,
      y
    }
  };
}

describe('Tests the user input system', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('placeholder', () => {

  });

  it('Tests an action without entities', () => {
    // pushing an action with no entities
    pushAction({
      hits: [],
      y: null,
      x: null,
      selectedBox: null,
      dbClick: null,
      isMouseDown: null,
      entities: null,
      name : 'addPop'
    });
    // the system doesn't even process it's input if there are no valid actions
    // @ts-ignore
    userInputSystem('asdsdfs');
    // the success of this test is that nothing throws exceptions, function returns nothing
  });


  it('Tests an invalid action(no name)', () => {
    // pushing an action with no entities
    pushAction({
      hits: [],
      name: null,
      y: null,
      x: null,
      selectedBox: null,
      dbClick: null,
      isMouseDown: null,
      entities : {}
    });
    // @ts-ignore
    userInputSystem('asdsdfs');
    // the system doesn't even process it's input if there are no valid actions
    // the success of this test is that nothing throws exceptions, function returns nothing
  });


  it('Tests that an entity can be selected', () => {
    let planet = new EarthLike(100, 100, PLAYER_1);

    // hits is provided by the game-platform library
    // it will contain the IDs of the hit items
    pushAction({
      entities: null,
      isMouseDown: null,
      dbClick: null,
      hits: [],
      name:CLICK,
      x : 500, // these don't really matter, as the hits are calculated internally by game-platform
      y : 500,
      selectedBox : getSelectedBox(500, 500)
    });
    userInputSystem(null);
    expect(planet[PLAYER_CONTROLLED].selected).toBe(false);

    pushAction({
      entities: null,
      isMouseDown: null,
      dbClick: null,
      hits: [{ id:planet.id.toString(), layerName: 'initial'}],
      name:CLICK,
      x : 100, // these don't really matter, as the hits are calculated internally by game-platform
      y : 104.99,
      selectedBox : getSelectedBox(100, 104.99)
    });
    userInputSystem(null);
    expect(planet[PLAYER_CONTROLLED].selected).toBe(true);

    pushAction({
      entities: null,
      isMouseDown: null,
      dbClick: null,
      hits: [{ id:planet.id.toString(), layerName: 'initial'}],
      name: CLICK,
      x : 99999999999, // these don't really matter, as the hits are calculated internally by game-platform
      y : 5000000,
      selectedBox : getSelectedBox(104.99, 100)
    });
    userInputSystem(null);
    expect(planet[PLAYER_CONTROLLED].selected).toBe(true);
  });


  it('Attacking action will set destination of fighters', () => {
    let attackingPlanet = new EarthLike(200, 200, PLAYER_1);
    let defendingPlanet = new EarthLike(100, 100, PLAYER_2);
    let attackFighter = createFighterEntity(attackingPlanet);

    attackingPlanet[PLAYER_CONTROLLED].selected = true;

    expect(getFighters(attackingPlanet).length).toBeGreaterThan(0);

    pushAction({
      selectedBox: null,
      entities: null,
      isMouseDown: null,
      dbClick: null,
      hits: [{ id:defendingPlanet.id.toString(), layerName: 'initial'}],
      name:CLICK,
      x : 100,
      y : 100
    });

    // // this sets the attack, but does not execute it
    userInputSystem(null);
    expect(attackFighter[POSITION].destX).toBe(100);
    expect(attackFighter[POSITION].destY).toBe(100);
  });
});