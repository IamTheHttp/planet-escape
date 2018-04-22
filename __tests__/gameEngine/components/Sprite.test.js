/* global describe */
/* global it */
/* global expect */
/* global beforeEach */
import {mount, shallow} from 'enzyme';
import React from 'react';
import Sprite, {getSpriteArgs} from 'gameEngine/components/Sprite';
import EarthLike from 'gameEngine/entities/planets/EarthLike';
import Entity from '../../../src/lib/ECS/Entity';
import {
  PLAYER_1,
  IN_PROGRESS,
  GAME_WON
} from 'gameEngine/constants';

describe('Tests a component', () => {
  beforeEach(() => {
    // setup the test
    Entity.reset();
  });

  it('init new component', () => {
    let data = {};
    let compDefault = new Sprite('IMAGE_PATH', data);
    let ent = new Entity();
    ent.addComponent(compDefault);
    expect(getSpriteArgs((ent))).toBe(data);
  });
});