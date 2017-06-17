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
} from 'gameEngine/ecs/systems/utils/userInput.util';
import EarthLike from 'gameEngine/ecs/entities/planets/EarthLike';
import {
  PLAYERCONTROLLED_COMP,
  POSITION_COMP
} from 'gameEngine/constants';

describe('Tests a component', function () {

  beforeEach(function () {
      //setup the test
  });

  it('getSelectedEntity', function () {
    let planetA = new EarthLike('foo',50,100,100);
    let planetB = new EarthLike('bar',50,100,100);

    let entities = {
      [planetA.id] : planetA,
      [planetB.id] : planetB,
    };

    planetA[PLAYERCONTROLLED_COMP].selected = true;
    let ent = getSelectedEntity(entities);
    expect(ent).toBe(planetA);

    planetA[PLAYERCONTROLLED_COMP].selected = false;
    ent = getSelectedEntity(entities);
    expect(ent).toBe(false);
    });

  it('setEntityDest', function () {
    let planetA = new EarthLike('foo',50,100,100);
    let planetB = new EarthLike('bar',50,100,100);

    let entities = {
      [planetA.id] : planetA,
      [planetB.id] : planetB,
    };
    planetA[PLAYERCONTROLLED_COMP].selected = true;

    setEntityDest(planetA,{x:50,y:100});
    expect(planetA[POSITION_COMP].destX).toBe(50);
    expect(planetA[POSITION_COMP].destY).toBe(100);
  });

  it('getEntityAtPos', () => {
    let planetA = new EarthLike('foo',50,100,100);
    let planetB = new EarthLike('bar',50,500,500);

    let entities = {
      [planetA.id] : planetA,
      [planetB.id] : planetB,
    };

    let ent = getEntityAtPos(entities,110,110);
    expect(ent).toBe(planetA);
  });

  it('getEntityAtPos - without POS location', () => {
    let planetA = new EarthLike('foo',50,100,100);
    delete planetA[POSITION_COMP];
    let entities = {
      [planetA.id] : planetA,
    };

    let ent = getEntityAtPos(entities,110,110);
    expect(ent).toBe(false);
  });


  it('selectEntity', () => {
    let planetA = new EarthLike('foo',50,100,100);

    let entities = {
      [planetA.id] : planetA,
    };
    expect(planetA[PLAYERCONTROLLED_COMP].selected).toBe(false);
    selectEntity(entities,{x:110,y:110});
    expect(planetA[PLAYERCONTROLLED_COMP].selected).toBe(true);

    // remove the playercontrolled comp, ensure nothingbreaks
    delete planetA[PLAYERCONTROLLED_COMP];
    selectEntity(entities,{x:110,y:110});
    expect(planetA[PLAYERCONTROLLED_COMP]).toBeUndefined();
    // expect(ent).toBe(planetA);
  });

});