import Entity from 'gameEngine/Entity';

/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import {
  selectEntity,
  getSelectedEntity,
  setEntityDest,
  getEntityAtPos
} from 'gameEngine/systems/utils/userInput.util';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import NullEntity from 'gameEngine/entities/NullEntity';
import {
  PLAYER_CONTROLLED,
  POSITION
} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
    Entity.reset();
  });

  it('getSelectedEntity', () => {
    let planetA = new EarthLike('foo',50,100,100);
    let planetB = new EarthLike('bar',50,100,100);

    let entities = {
      [planetA.id] : planetA,
      [planetB.id] : planetB
    };

    planetA[PLAYER_CONTROLLED].selected = true;
    let ent = getSelectedEntity(entities);
    expect(ent).toBe(planetA);

    planetA[PLAYER_CONTROLLED].selected = false;
    ent = getSelectedEntity(entities);
    expect(ent).toBe(new NullEntity());
  });

  it('setEntityDest', () => {
    let planetA = new EarthLike('foo',50,100,100);
    let planetB = new EarthLike('bar',50,100,100);

    planetA[PLAYER_CONTROLLED].selected = true;

    setEntityDest(planetA,{x:50,y:100});
    expect(planetA[POSITION].destX).toBe(50);
    expect(planetA[POSITION].destY).toBe(100);
  });

  it('getEntityAtPos', () => {
    let planetA = new EarthLike('foo',50,100,100);
    let planetB = new EarthLike('bar',50,500,500);
    let ent = getEntityAtPos(110,110);
    expect(ent).toBe(planetA);
  });

  it('getEntityAtPos - without POS location', () => {
    let planetA = new EarthLike('foo',50,100,100);
    planetA.removeComponent(POSITION);
    let entities = {
      [planetA.id] : planetA
    };

    let ent = getEntityAtPos(entities,110,110);
    expect(ent).toBe(new NullEntity());
  });


  it('selectEntity', () => {
    let planetA = new EarthLike('foo',50,100,100);

    expect(planetA[PLAYER_CONTROLLED].selected).toBe(false);
    selectEntity({x:110,y:110});
    expect(planetA[PLAYER_CONTROLLED].selected).toBe(true);

    // remove the playercontrolled comp, ensure nothingbreaks
    planetA.removeComponent(PLAYER_CONTROLLED);
    selectEntity({x:110,y:110});
    expect(planetA[PLAYER_CONTROLLED]).toBeUndefined();
  });
});