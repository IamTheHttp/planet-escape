/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import {
  selectEntity,
  getSelectedEntity,
  moveSelectedEntity
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

  it('moveSelectedEntity', function () {
    let planetA = new EarthLike('foo',50,100,100);
    let planetB = new EarthLike('bar',50,100,100);

    let entities = {
      [planetA.id] : planetA,
      [planetB.id] : planetB,
    };
    planetA[PLAYERCONTROLLED_COMP].selected = true;

    moveSelectedEntity(planetA,{x:50,y:100});
    expect(planetA[POSITION_COMP].destX).toBe(50);
    expect(planetA[POSITION_COMP].destY).toBe(100);
  });
});