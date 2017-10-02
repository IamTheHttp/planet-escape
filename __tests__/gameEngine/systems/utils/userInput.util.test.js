import Entity from 'gameEngine/Entity';

/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import {
  selectEntity,
  getSelectedEntities,
  setEntityDest,
  getEntitiesAtPos,
  selectEntitiesInSelectedBox
} from 'gameEngine/systems/utils/userInput.util';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import {
  PLAYER_CONTROLLED,
  POSITION,
  PLAYER_1
} from 'gameEngine/constants';

describe('Tests the user input utils', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('getSelectedEntities', () => {
    let planetA = new EarthLike('foo', 50, 100, 100);
    let planetB = new EarthLike('bar', 50, 100, 100);

    let entities = {
      [planetA.id] : planetA,
      [planetB.id] : planetB
    };

    planetA[PLAYER_CONTROLLED].selected = true;
    let ents = getSelectedEntities(entities);
    expect(ents[0]).toBe(planetA);

    planetA[PLAYER_CONTROLLED].selected = false;
    ents = getSelectedEntities(entities);
    expect(ents.length).toBe(0);
  });

  it('setEntityDest', () => {
    let planetA = new EarthLike('foo', 50, 100, 100);
    let planetB = new EarthLike('bar', 50, 100, 100);

    planetA[PLAYER_CONTROLLED].selected = true;

    setEntityDest(planetA, {x:50, y:100});
    expect(planetA[POSITION].destX).toBe(50);
    expect(planetA[POSITION].destY).toBe(100);
  });

  it('getEntitiesAtPos', () => {
    let planetA = new EarthLike('foo', 50, 100, 100);
    let planetB = new EarthLike('bar', 50, 500, 500);
    let ents = getEntitiesAtPos(110, 110);
    expect(ents[0]).toBe(planetA);
  });

  it('getEntitiesAtPos - without POS location', () => {
    let planetA = new EarthLike('foo', 50, 100, 100);
    planetA.removeComponent(POSITION);
    let entities = {
      [planetA.id] : planetA
    };

    let ents = getEntitiesAtPos(entities, 110, 110);
    expect(ents.length).toBe(0);
  });


  it('selectEntity', () => {
    let planetA = new EarthLike('foo', 50, 100, 100, PLAYER_1);

    expect(planetA[PLAYER_CONTROLLED].selected).toBe(false);
    selectEntity({x:110, y:110});
    expect(planetA[PLAYER_CONTROLLED].selected).toBe(true);

    // remove the playercontrolled comp, ensure nothing breaks
    planetA.removeComponent(PLAYER_CONTROLLED);
    selectEntity({x:110, y:110});
    expect(planetA[PLAYER_CONTROLLED]).toBeUndefined();
  });

  it('selectEntitiesInSelectedBox', () => {
    let planetA = new EarthLike('foo', 50, 100, 100, PLAYER_1);
    expect(planetA[PLAYER_CONTROLLED].selected).toBe(false);

    let selectBox = {
      start : {
        x: 0,
        y : 0
      },
      end : {
        x: 10000,
        y : 10000
      }
    };
    selectEntitiesInSelectedBox(selectBox);
    expect(planetA[PLAYER_CONTROLLED].selected).toBe(true);

    // // remove the playercontrolled comp, ensure nothing breaks
    // planetA.removeComponent(PLAYER_CONTROLLED);
    // selectEntity({x:110, y:110});
    // expect(planetA[PLAYER_CONTROLLED]).toBeUndefined();
  });
});